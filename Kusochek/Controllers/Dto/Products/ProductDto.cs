using Domain.Entities;
using Kusochek.Controllers.Dto.Reviews;

namespace Kusochek.Controllers.Dto.Products;

public class ProductDto
{
	public int Id { get; set; }
	public string Name { get; set; }
	public decimal Price { get; set; }
	public decimal? PromotionPrice { get; set; }
	public string Category { get; set; }
	public string? ImageUrl { get; set; }
	
	public double? AverageMark { get; set; }
}

public class ProductDetailedInformationDto : ProductDto
{
	public IEnumerable<string> Images { get; set; }
	public IEnumerable<ReviewDto> Reviews { get; set; }
	
	public double Weight { get; set; }
}

public static class ProductDtoExtensions
{
	public static ProductDto MapToProductDto(this Product product)
	{
		return new ProductDto
		{
			Id = product.Id,
			Name = product.Name,
			Price = product.Price,
			PromotionPrice = product.PromotionPrice,
			Category = product.Category.ToString(),
			ImageUrl = product.Images.FirstOrDefault()?.FileUrl,
			AverageMark = product.AverageMark
		};
	}
	
	public static ProductDto MapToProductDetailedInformationDto(this Product product)
	{
		return new ProductDetailedInformationDto
		{
			Id = product.Id,
			Name = product.Name,
			Price = product.Price,
			PromotionPrice = product.PromotionPrice,
			Category = product.Category.ToString(),
			AverageMark = product.AverageMark,
			Images = product.Images.Select(i => i.FileUrl),
			Reviews = product.Reviews.Select(r => r.MapToReviewDto()),
			Weight = product.Weight
		};
	}
}