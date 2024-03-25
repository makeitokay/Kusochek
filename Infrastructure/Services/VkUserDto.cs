using System.Runtime.Serialization;

namespace Infrastructure;

public class VkUserDto
{
	public ICollection<UserResponseDto> response { get; set; }
}

public class UserResponseDto
{
	public string first_name { get; set; }
	
	public string last_name { get; set; }
	
	public string photo_400_orig { get; set; }
}