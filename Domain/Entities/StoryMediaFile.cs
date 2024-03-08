using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("StoryMediaFiles")]
public class StoryMediaFile : BaseEntity
{
	public virtual Story Story { get; set; }
	
	[Column("StoryId")]
	public int StoryId { get; set; }
	
	public virtual MediaFile MediaFile { get; set; }
	
	[Column("MediaFileId")]
	public int MediaFileId { get; set; }
}