using Domain.Entities;

namespace Kusochek.Controllers.Dto.Stories;

public class StoryDto
{
	public int Id { get; set; }
	public string Preview { get; set; }
	public string Title { get; set; }
	public IEnumerable<string> Content { get; set; }
	public DateTimeOffset ExpirationDate { get; set; }
	
	public string Status { get; set; }
}

public static class StoryDtoExtensions
{
	public static StoryDto MapToStoryDto(this Story story)
	{
		return new StoryDto
		{
			Id = story.Id,
			Preview = story.PreviewImage.FileUrl,
			Content = story.Content.Select(file => file.MediaFile.FileUrl),
			Title = story.Title,
			ExpirationDate = story.ExpirationDateTimeUtc,
			Status = story.Status.ToString()
		};
	}
}