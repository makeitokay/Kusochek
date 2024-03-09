using Domain.Entities;

namespace Kusochek.Controllers.Dto.Reviews;

public class ReviewDto
{
	public int Id { get; set; }
	public string Author { get; set; }
	public int Mark { get; set; }
	public string ReviewText { get; set; }
}

public static class ReviewDtoExtensions
{
	public static ReviewDto MapToReviewDto(this Review review)
	{
		return new ReviewDto
		{
			Id = review.Id,
			Author = $"{review.User.FirstName} {review.User.LastName}",
			Mark = review.Mark,
			ReviewText = review.ReviewText
		};
	}
}