using Domain.Entities;
using Infrastructure;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kusochek.Controllers;

[Route("profile")]
[Authorize]
public class UserProfileController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IPasswordManager _passwordManager;

	public UserProfileController(IUserRepository userRepository, IPasswordManager passwordManager)
	{
		_userRepository = userRepository;
		_passwordManager = passwordManager;
	}

	[HttpGet]
	public async Task<IActionResult> GetProfileAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);
		return Ok(user.MapToUserDto());
	}

	[HttpPost("uploadPicture")]
	public async Task<IActionResult> UploadPictureAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!Request.Form.Files.Any())
			return BadRequest();
		
		var file = Request.Form.Files[0];
		using var memoryStream = new MemoryStream();
		file.CopyTo(memoryStream);
		var image = memoryStream.ToArray();

		user.ProfilePicture = new Image
		{
			Content = image
		};
		await _userRepository.UpdateAsync(user);

		return Ok();
	}

	[HttpPost("changePassword")]
	public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordDto changePasswordDto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		var passwordHash = _passwordManager.GetPasswordHash(changePasswordDto.NewPassword, out var salt);

		user.PasswordHash = passwordHash;
		user.PasswordSalt = salt;

		await _userRepository.UpdateAsync(user);

		return Ok();
	}
}