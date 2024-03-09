using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DigitalDiary.Controllers.Dto.Authorization;
using Domain.Entities;
using Infrastructure;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Kusochek.Controllers;

[Route("auth")]
public class AuthorizationController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IPasswordManager _passwordManager;

	public AuthorizationController(IUserRepository userRepository, IPasswordManager passwordManager)
	{
		_userRepository = userRepository;
		_passwordManager = passwordManager;
	}

	[HttpPost("login")]
	public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginDto loginDto)
	{
		var user = await _userRepository.TryGetByEmailAsync(loginDto.Email);

		if (user == null || !_passwordManager.VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
		{
			return Unauthorized("Неверный логин или пароль");
		}

		return new LoginResponseDto { AccessToken = GetJwtForUser(user) };
	}

	[HttpPost("signup")]
	public async Task<ActionResult<LoginResponseDto>> SignupAsync([FromBody] SignupDto userDto)
	{
		var user = await _userRepository.TryGetByEmailAsync(userDto.Email);

		if (user is not null)
			return BadRequest("Пользователь с таким EMAIL уже существует!");

		var passwordHash = _passwordManager.GetPasswordHash(userDto.Password, out var salt);

		user = new User
		{
			Email = userDto.Email,
			FirstName = userDto.FirstName,
			LastName = userDto.LastName,
			MobilePhone = userDto.MobilePhone,
			PasswordHash = passwordHash,
			PasswordSalt = salt
		};

		await _userRepository.CreateAsync(user);

		return new LoginResponseDto { AccessToken = GetJwtForUser(user) };
	}

	private static string GetJwtForUser(User user)
	{
		var userClaims = new List<Claim>
		{
			new(ClaimTypes.Email, user.Email),
			new(Constants.KusochekClaimTypes.UserId, user.Id.ToString())
		};

		var jwt = new JwtSecurityToken(
			issuer: Constants.Authentication.Issuer,
			audience: Constants.Authentication.Audience,
			claims: userClaims,
			expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
			signingCredentials: new SigningCredentials(
				new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KusochekBakeryMoscowUltraSecretKey2024")),
				SecurityAlgorithms.HmacSha256));

		return new JwtSecurityTokenHandler().WriteToken(jwt);
	}
}