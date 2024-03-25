namespace Infrastructure;


public class VkExchangeSilentTokenDto
{
	public ResponseDto response { get; set; }
}

public class ResponseDto
{
	public string email { get; set; }
	
	public string access_token { get; set; }
	
	public long user_id { get; set; }
}