using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Reviews")]
public class Review : BaseEntity
{
	public virtual User User { get; set; }
	
	[Column("CustomerId")]
	public int CustomerId { get; set; }
	
	public virtual Product Product { get; set; }
	
	[Column("ProductId")]
	public int ProductId { get; set; }
	
	[Column("ReviewText", TypeName = "text")]
	public string ReviewText { get; set; }
	
	[Column("Mark")]
	public int Mark { get; set; }
	
	[Column("CreationDateTimeUtc")]
	public DateTimeOffset CreationDateTimeUtc { get; set; }
}