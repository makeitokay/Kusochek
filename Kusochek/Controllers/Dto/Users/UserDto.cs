using Domain.Entities;

namespace Kusochek.Controllers.Dto.Users;

public class UserDto
{
	public string FirstName { get; set; } = default!;
	
	public string LastName { get; set; } = default!;

	public string Email { get; set; } = default!;

	public string MobilePhone { get; set; } = default!;
	
	public string? ProfilePictureUrl { get; set; }
	
	public bool IsAdmin { get; set; }
}

public static class UserDtoExtensions
{
	public static UserDto MapToUserDto(this User user)
	{
		return new UserDto
		{
			FirstName = user.FirstName,
			LastName = user.LastName,
			Email = user.Email,
			MobilePhone = user.MobilePhone,
			ProfilePictureUrl = user.ProfilePicture?.FileUrl,
			IsAdmin = user.IsAdmin
		};
	}
}