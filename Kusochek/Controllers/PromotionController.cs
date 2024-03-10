using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Promotions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kusochek.Controllers;

[Route("promotions")]
[Authorize]
public class PromotionController : ControllerBase
{
	private readonly IRepository<Promotion> _promotionRepository;
	private readonly IUserRepository _userRepository;

	public PromotionController(
		IRepository<Promotion> promotionRepository,
		IUserRepository userRepository)
	{
		_promotionRepository = promotionRepository;
		_userRepository = userRepository;
	}

	[HttpPost]
	public async Task<IActionResult> CreatePromotionAsync([FromBody] CreatePromotionDto dto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();

		var promotion = await _promotionRepository
			.Items
			.FirstOrDefaultAsync(p => p.ProductId == dto.ProductId && p.ExpirationDateTimeUtc > DateTimeOffset.UtcNow);
		if (promotion is not null)
			return BadRequest("Уже существует акция на этот товар.");

		await _promotionRepository.CreateAsync(new Promotion
		{
			ExpirationDateTimeUtc = dto.ExpirationDate,
			ProductId = dto.ProductId,
			PromotionPrice = dto.PromotionPrice
		});

		return Ok();
	}

	[HttpGet]
	public async Task<IActionResult> GetPromotionsAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();

		var promotions = await _promotionRepository
			.Items
			.Where(p => p.ExpirationDateTimeUtc > DateTimeOffset.UtcNow)
			.ToListAsync();

		return Ok(promotions.Select(p => p.MapToPromotionDto()));
	}
}