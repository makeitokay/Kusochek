using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Stories")]
public class Story : BaseEntity
{
	public virtual ICollection<StoryMediaFile> Content { get; set; }
	public DateTimeOffset ExpirationDateTimeUtc { get; set; }
}