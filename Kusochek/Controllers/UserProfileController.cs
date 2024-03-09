using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Kusochek;

[Route("profile")]
public class UserProfileController : ControllerBase
{
	private readonly ICustomerRepository _customerRepository;

	public UserProfileController(ICustomerRepository customerRepository)
	{
		_customerRepository = customerRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetProfileAsync()
	{
		return Ok("Hello world!");
	}
}