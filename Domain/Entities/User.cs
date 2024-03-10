using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Users")]
public class User : BaseEntity
{
	[Column("FirstName")]
	public string FirstName { get; set; } = default!;
	
	[Column("LastName")]
	public string LastName { get; set; } = default!;

	[Column("Email")]
	public string Email { get; set; } = default!;

	[Column("PasswordHash")]
	public string PasswordHash { get; set; } = default!;

	[Column("PasswordSalt")]
	public byte[] PasswordSalt { get; set; } = default!;

	[Column("MobilePhone")]
	public string MobilePhone { get; set; } = default!;
	
	public virtual ICollection<ProductItem> CartItems { get; set; }
	
	public virtual ICollection<Order> Orders { get; set; }
	
	public virtual MediaFile? ProfilePicture { get; set; }
	
	[Column("ProfilePictureId")]
	public int? ProfilePictureId { get; set; }
	
	[Column("IsAdmin")]
	public bool IsAdmin { get; set; }
}