using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Infrastructure;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Kusochek.Controllers;

[Route("auth")]
public class AuthorizationController(
	IUserRepository userRepository,
	IPasswordManager passwordManager,
	IVkApiClient vkApiClient,
	IStaticFileManager staticFileManager)
	: ControllerBase
{
	[HttpPost("login")]
	public async Task<ActionResult<LoginResponseDto>> LoginAsync([FromBody] LoginDto loginDto)
	{
		var user = await userRepository.TryGetByEmailAsync(loginDto.Email);

		if (user is null)
		{
			return Unauthorized("Неверный логин или пароль");
		}
		
		if (user.PasswordHash is null || user.PasswordSalt is null)
		{
			return Unauthorized("Неверный логин или пароль");
		}

		if (!passwordManager.VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
		{
			return Unauthorized("Неверный логин или пароль");
		}

		return new LoginResponseDto { AccessToken = GetJwtForUser(user) };
	}

	[HttpPost("signup")]
	public async Task<ActionResult<LoginResponseDto>> SignupAsync([FromBody] SignupDto userDto)
	{
		var user = await userRepository.TryGetByEmailAsync(userDto.Email);

		if (user is not null)
			return BadRequest("Пользователь с таким EMAIL уже существует!");

		var passwordHash = passwordManager.GetPasswordHash(userDto.Password, out var salt);

		user = new User
		{
			Email = userDto.Email,
			FirstName = userDto.FirstName,
			LastName = userDto.LastName,
			MobilePhone = userDto.MobilePhone,
			PasswordHash = passwordHash,
			PasswordSalt = salt
		};

		await userRepository.CreateAsync(user);

		return new LoginResponseDto { AccessToken = GetJwtForUser(user) };
	}

	[HttpPost("vk")]
	public async Task<ActionResult<LoginResponseDto>> VkAuthAsync([FromBody] VkAuthDto authDto)
	{
		var result = await vkApiClient.ExchangeSilentTokenAsync(authDto.Token, authDto.Uuid);
		var vkUser = await vkApiClient.GetUserInformationAsync(result.response.access_token);

		var firstName = vkUser.response.First().first_name;
		var lastName = vkUser.response.First().last_name;
		var email = result.response.email;
		var photoUrl = vkUser.response.First().photo_400_orig;
		
		var user = await userRepository.TryGetByVkIdAsync(result.response.user_id);
		if (user is not null)
		{
			return new LoginResponseDto { AccessToken = GetJwtForUser(user) };
		}
		
		using var httpClient = new HttpClient();

		var stream = await httpClient.GetStreamAsync(photoUrl);
		var uri = new Uri(photoUrl);
		var uriWithoutQuery = uri.GetLeftPart(UriPartial.Path);
		var fileName = Path.GetFileName(uriWithoutQuery);

		var uploadedUrl = await staticFileManager.UploadFileAsync(stream, fileName);
		
		user = new User
		{
			Email = email,
			FirstName = firstName,
			LastName = lastName,
			VkId = result.response.user_id,
			ProfilePicture = new MediaFile
			{
				FileUrl = uploadedUrl,
				Type = MediaFileType.Image
			}
		};
		await userRepository.CreateAsync(user);

		return new LoginResponseDto() { AccessToken = GetJwtForUser(user) };
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