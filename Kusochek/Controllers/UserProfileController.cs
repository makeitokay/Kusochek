using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Kusochek.Controllers;

[Route("profile")]
public class UserProfileController : ControllerBase
{
	private readonly IUserRepository _userRepository;

	public UserProfileController(IUserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetProfileAsync()
	{
		return Ok("Hello world!");
	}
}