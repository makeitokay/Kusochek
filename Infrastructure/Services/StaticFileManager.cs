namespace Infrastructure;

public interface IStaticFileManager
{
	Task<string> UploadFileAsync(Stream fileStream, string fileName);
}

public class StaticFileManager : IStaticFileManager
{
	private const string UploadDirectory = "C:\\Users\\makeitokay\\RiderProjects\\Kusochek\\static";
	
	public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
	{
		var uniqueFileName = Guid.NewGuid() + Path.GetExtension(fileName);
		if (!Directory.Exists(UploadDirectory))
			Directory.CreateDirectory(UploadDirectory);
			
		var filePath = Path.Combine(UploadDirectory, uniqueFileName);

		await using var output = new FileStream(filePath, FileMode.Create);
		await fileStream.CopyToAsync(output);

		return filePath;
	}
}