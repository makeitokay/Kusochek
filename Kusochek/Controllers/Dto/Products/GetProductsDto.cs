namespace Kusochek.Controllers.Dto.Products;

public class GetProductsDto
{
	public string? Categories { get; set; }
	public int? MinPrice { get; set; }
	public int? MaxPrice { get; set; }
	public int? MinWeight { get; set; }
	public int? MaxWeight { get; set; }
	public string? Query { get; set; }
	public string? SortBy { get; set; }
	public int Page { get; set; } = 1;
	
	public string? Id { get; set; }
}