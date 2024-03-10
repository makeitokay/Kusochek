using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Reviews;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kusochek.Controllers;

[Route("reviews")]
public class ReviewsController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IRepository<Product> _productRepository;

	public ReviewsController(IUserRepository userRepository, IRepository<Product> productRepository)
	{
		_userRepository = userRepository;
		_productRepository = productRepository;
	}

	[HttpPost("{productId:int}")]
	[Authorize]
	public async Task<IActionResult> CreateReviewAsync(int productId, [FromBody] ReviewDto reviewDto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);
		var product = await _productRepository.GetAsync(productId);

		if (user.Reviews.Any(r => r.ProductId == productId))
			return BadRequest("Уже существует отзыв на этот товар.");
		
		user.Reviews.Add(new Review
		{
			CreationDateTimeUtc = DateTimeOffset.UtcNow,
			Mark = reviewDto.Mark,
			Product = product,
			ReviewText = reviewDto.ReviewText,
			User = user
		});

		await _userRepository.UpdateAsync(user);

		return Ok();
	}
}