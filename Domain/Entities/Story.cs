using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Stories")]
public class Story : BaseEntity
{
	public virtual MediaFile PreviewImage { get; set; }
	
	[Column("PreviewImageId")]
	public int PreviewImageId { get; set; }
	
	[Column("Title")]
	public string Title { get; set; }
	
	public virtual ICollection<StoryMediaFile> Content { get; set; }
	
	[Column("ExpirationDateTimeUtc")]
	public DateTimeOffset ExpirationDateTimeUtc { get; set; }
	
	[Column("CreationDateTimeUtc")]
	public DateTimeOffset CreationDateTimeUtc { get; set; }
	
	[Column("Status")]
	public StoryStatus Status { get; set; }
}

public enum StoryStatus
{
	Draft,
	Ready
}