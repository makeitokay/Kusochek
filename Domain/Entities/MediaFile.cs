using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("MediaFiles")]
public class MediaFile : BaseEntity
{
	[Column("Type")]
	public MediaFileType Type { get; set; }
	
	[Column("FileUrl")]
	public string FileUrl { get; set; } = default!;
	
	public virtual ICollection<Product> Products { get; set; }
}

public enum MediaFileType
{
	Image,
	Video
}