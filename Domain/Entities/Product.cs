using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Products")]
public class Product : BaseEntity
{
	[Column("Name")]
	public string Name { get; set; } = default!;
	
	[Column("Category")]
	public ProductCategory Category { get; set; }
	
	[Column("Price")]
	public decimal Price { get; set; }

	public decimal? PromotionPrice
	{
		get
		{
			var actualPromotion = Promotions.FirstOrDefault(p => p.ExpirationDateTimeUtc >= DateTimeOffset.UtcNow);
			return actualPromotion?.PromotionPrice;
		}
	}

	public double? AverageMark
	{
		get
		{
			if (Reviews.Count != 0)
				return Reviews.Average(r => r.Mark);
			return null;
		}
	}

	[Column("Weight")]
	public double Weight { get; set; }
	
	[Column("Quantity")]
	public int Quantity { get; set; }
	
	[Column("Description", TypeName = "text")]
	public string Description { get; set; }
	
	public virtual ICollection<MediaFile> Images { get; set; }
	
	public virtual ICollection<Promotion> Promotions { get; set; }
	
	public virtual ICollection<ProductItem> ProductItems { get; set; }
	
	public virtual ICollection<Review> Reviews { get; set; }
}

public enum ProductCategory
{
	Cake
}