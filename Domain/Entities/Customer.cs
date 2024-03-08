using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Customers")]
public class Customer : BaseUser
{
	public virtual ICollection<ProductItem> CartItems { get; set; }
	
	public virtual Image ProfilePicture { get; set; }
	
	[Column("ProfilePictureId")]
	public int ProfilePictureId { get; set; }
}