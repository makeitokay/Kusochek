using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace Infrastructure;

public interface IVkApiClient
{
	Task<VkExchangeSilentTokenDto> ExchangeSilentTokenAsync(string silentToken, string uuid);
	Task<VkUserDto> GetUserInformationAsync(string accessToken);
}

public class VkApiClient(IHttpClientFactory clientFactory, IOptionsMonitor<VkOptions> vkOptions) : IVkApiClient
{
	public async Task<VkExchangeSilentTokenDto> ExchangeSilentTokenAsync(string silentToken, string uuid)
	{
		using var vkClient = clientFactory.CreateClient("vk");

		var content = new MultipartFormDataContent();
		content.Add(new StringContent("5.131"), "v");
		content.Add(new StringContent(silentToken), "token");
		content.Add(new StringContent(vkOptions.CurrentValue.ServiceToken), "access_token");
		content.Add(new StringContent(uuid), "uuid");

		var response = await vkClient.PostAsync("method/auth.exchangeSilentAuthToken", content);

		var result = await response.Content.ReadAsStringAsync();
		var obj = JsonSerializer.Deserialize<VkExchangeSilentTokenDto>(result);
		if (obj is null)
		{
			throw new InvalidOperationException();
		}
		return obj;
	}

	public async Task<VkUserDto> GetUserInformationAsync(string accessToken)
	{
		using var vkClient = clientFactory.CreateClient("vk");

		var content = new MultipartFormDataContent();
		content.Add(new StringContent("5.199"), "v");
		content.Add(new StringContent(accessToken), "access_token");
		content.Add(new StringContent("photo_400_orig"), "fields");

		var response = await vkClient.PostAsync("method/users.get", content);
		var result = await response.Content.ReadAsStringAsync();

		var obj = JsonSerializer.Deserialize<VkUserDto>(result);
		if (obj is null)
		{
			throw new InvalidOperationException();
		}
		return obj;
	}
}