using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Orders")]
public class Order : BaseEntity
{
	public virtual ICollection<ProductItem> Items { get; set; }
	
	[Column("Cost")]
	public decimal Cost { get; set; }
	
	[Column("CreationDateTimeUtc")]
	public DateTimeOffset CreationDateTimeUtc { get; set; }
	
	public virtual User? User { get; set; }
	
	[Column("UserId")]
	public int? UserId { get; set; }
	
	[Column("Status")]
	public OrderStatus Status { get; set; }
	
	[Column("Name")]
	public string Name { get; set; }
	
	[Column("LastName")]
	public string LastName { get; set; }
	
	[Column("Phone")]
	public string Phone { get; set; }
	
	[Column("DeliveryAddress")]
	public string DeliveryAddress { get; set; }
	
	[Column("DeliveryDateTimeUtc")]
	public DateTimeOffset DeliveryDateTimeUtc { get; set; }
}

public enum OrderStatus
{
	Accepted,
	InDelivery,
	Cancelled,
	Completed
}