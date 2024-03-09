namespace Kusochek.Controllers.Dto.Authorization;

public class SignupDto
{
	public string FirstName { get; set; } = default!;
	
	public string LastName { get; set; } = default!;

	public string Email { get; set; } = default!;

	public string MobilePhone { get; set; } = default!;
	
	public string Password { get; set; } = default!;
}