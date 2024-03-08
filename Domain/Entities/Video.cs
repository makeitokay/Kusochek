using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Video : MediaFile
{
	[Column("FileName")]
	public string FileName { get; set; }
}