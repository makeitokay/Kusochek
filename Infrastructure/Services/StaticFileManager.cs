namespace Infrastructure;

public interface IStaticFileManager
{
	Task<string> UploadFileAsync(Stream fileStream, string fileName);
}

public class StaticFileManager : IStaticFileManager
{
	private const string UploadDirectory = "static";
	
	public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
	{
		var uniqueFileName = Guid.NewGuid() + Path.GetExtension(fileName);
		var uploadDirectoryPath = Path.Combine(Directory.GetCurrentDirectory(), UploadDirectory);
		if (!Directory.Exists(uploadDirectoryPath))
			Directory.CreateDirectory(uploadDirectoryPath);
			
		var filePath = Path.Combine(uploadDirectoryPath, uniqueFileName);

		await using var output = new FileStream(filePath, FileMode.Create);
		await fileStream.CopyToAsync(output);

		return filePath;
	}
}