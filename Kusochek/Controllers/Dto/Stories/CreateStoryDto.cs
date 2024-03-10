namespace Kusochek.Controllers.Dto.Stories;

public class CreateStoryDto
{
	public DateTimeOffset ExpirationDate { get; set; }
	
	public IFormFile Preview { get; set; }
	public string Title { get; set; }
}