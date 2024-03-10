using Domain.Entities;

namespace Kusochek.Controllers.Dto.Promotions;

public class PromotionDto : CreatePromotionDto
{
	public int Id { get; set; }
}

public static class PromotionDtoExtensions
{
	public static PromotionDto MapToPromotionDto(this Promotion promotion)
	{
		return new PromotionDto
		{
			Id = promotion.Id,
			ProductId = promotion.ProductId,
			PromotionPrice = promotion.PromotionPrice,
			ExpirationDate = promotion.ExpirationDateTimeUtc
		};
	}
}