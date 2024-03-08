using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Image : MediaFile
{
	[Column("Content")]
	public byte[] Content { get; set; }
	
	public virtual ICollection<Product> Products { get; set; }
}