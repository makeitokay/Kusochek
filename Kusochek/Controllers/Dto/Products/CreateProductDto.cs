namespace Kusochek.Controllers.Dto.Products;

public class CreateOrEditProductDto
{
	public int? Id { get; set; }
	public string Name { get; set; }
	public decimal Price { get; set; }
	public string Category { get; set; }
	public double Weight { get; set; }
	public string Description { get; set; }
	public List<IFormFile>? Images { get; set; }
	public int Quantity { get; set; }
}