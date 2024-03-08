using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Orders")]
public class Order : BaseEntity
{
	public virtual ICollection<ProductItem> Items { get; set; }
	
	[Column("Cost")]
	public int Cost { get; set; }
	
	[Column("CreationDateTimeUtc")]
	public DateTimeOffset CreationDateTimeUtc { get; set; }
	
	public virtual Customer Customer { get; set; }
	
	[Column("CustomerId")]
	public int CustomerId { get; set; }
	
	[Column("Status")]
	public OrderStatus Status { get; set; }
}

public enum OrderStatus
{
	Accepted,
	InDelivery,
	Cancelled,
	Completed
}