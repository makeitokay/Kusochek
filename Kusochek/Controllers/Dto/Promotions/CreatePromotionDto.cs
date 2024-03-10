namespace Kusochek.Controllers.Dto.Promotions;

public class CreatePromotionDto
{
	public int ProductId { get; set; }
	public decimal PromotionPrice { get; set; }
	public DateTimeOffset ExpirationDate { get; set; }
}