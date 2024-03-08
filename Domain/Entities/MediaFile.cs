using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("MediaFiles")]
public abstract class MediaFile : BaseEntity
{
	public string Discriminator { get; set; } = default!;
}