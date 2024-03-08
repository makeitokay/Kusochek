using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Promotion")]
public class Promotion : BaseEntity
{
	public virtual Product Product { get; set; }
	
	[Column("ProductId")]
	public int ProductId { get; set; }
	
	[Column("PromotionPrice")]
	public decimal PromotionPrice { get; set; }
	
	[Column("ExpirationDateTimeUtc")]
	public DateTimeOffset ExpirationDateTimeUtc { get; set; }
}