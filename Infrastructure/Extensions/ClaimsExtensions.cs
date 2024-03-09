using System.Security.Claims;

namespace Infrastructure.Extensions;

public static class ClaimsExtensions
{
	public static int GetUserId(this IEnumerable<Claim> claims)
	{
		return int.Parse(claims.GetClaimValue(Constants.KusochekClaimTypes.UserId));
	}
	
	private static string GetClaimValue(this IEnumerable<Claim> claims, string claimType)
	{
		return claims.FirstOrDefault(claim => claim.Type == claimType)?.Value
		       ?? throw new ArgumentException();
	}
}