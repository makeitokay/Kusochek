using Domain.Entities;
using Infrastructure;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kusochek.Controllers;

[Route("products")]
public class ProductsController : ControllerBase
{
	private readonly IRepository<Product> _productRepository;
	private readonly IStaticFileManager _staticFileManager;
	private readonly IUserRepository _userRepository;

	public ProductsController(
		IRepository<Product> productRepository, IStaticFileManager staticFileManager, IUserRepository userRepository)
	{
		_productRepository = productRepository;
		_staticFileManager = staticFileManager;
		_userRepository = userRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetProductsAsync([FromQuery] GetProductsDto getProductsDto)
	{
		var productsQueryable = _productRepository.Items;

		if (getProductsDto.Id is not null)
		{
			var ids = getProductsDto.Id.Split(',').Select(id => Convert.ToInt32(id));
			productsQueryable = productsQueryable.Where(p => ids.Contains(p.Id));
			var productsByIds = await productsQueryable.ToListAsync();
			return Ok(productsByIds.Select(p => p.MapToProductDto()));
		}

		if (getProductsDto.MinPrice is not null)
			productsQueryable = productsQueryable.Where(p => p.Price >= getProductsDto.MinPrice.Value);
		if (getProductsDto.MaxPrice is not null)
			productsQueryable = productsQueryable.Where(p => p.Price <= getProductsDto.MaxPrice.Value);
		if (getProductsDto.Categories is not null)
		{
			var categoriesArray = getProductsDto.Categories.Split(',');
			productsQueryable = productsQueryable
				.Where(p => categoriesArray
					.Any(category => category.ToLower() == p.Category.ToString().ToLower()));
		}
		if (getProductsDto.MinWeight is not null)
			productsQueryable = productsQueryable.Where(p => p.Price >= getProductsDto.MinWeight.Value);
		if (getProductsDto.MaxWeight is not null)
			productsQueryable = productsQueryable.Where(p => p.Price <= getProductsDto.MaxWeight.Value);

		if (getProductsDto.SortBy is null or "popularity")
			productsQueryable = productsQueryable.OrderBy(p =>
				p.ProductItems
					.Where(pi => pi.Order != null)
					.Where(pi => DateTimeOffset.UtcNow - pi.Order!.CreationDateTimeUtc < TimeSpan.FromDays(30))
					.Sum(pi => pi.Quantity));
		else if (getProductsDto.SortBy == "price")
			productsQueryable = productsQueryable.OrderBy(p => p.Price);

		productsQueryable = productsQueryable
			.Skip((getProductsDto.Page - 1) * 30)
			.Take(30);

		var products = await productsQueryable.ToListAsync();
		return Ok(products.Select(p => p.MapToProductDto()));
	}

	[HttpGet("{id:int}")]
	public async Task<IActionResult> GetProductAsync(int id)
	{
		var product = await _productRepository.TryGetAsync(id);
		if (product is null)
			return NotFound();

		return Ok(product.MapToProductDetailedInformationDto());
	}

	[HttpPost]
	[Authorize]
	public async Task<IActionResult> CreateOrEditProductAsync([FromForm] CreateOrEditProductDto dto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);
		if (!user.IsAdmin)
			return Forbid();
		
		Product product;
		if (dto.Id is not null)
			product = await _productRepository.GetAsync(dto.Id.Value);
		else
			product = new Product();
		
		product.Name = dto.Name;
		product.Price = dto.Price;
		product.Weight = dto.Weight;
		product.Category = ParseCategory(dto.Category);
		product.Description = dto.Description;
		product.Quantity = dto.Quantity;
		
		if (dto.Images is not null)
		{
			var images = new List<MediaFile>();
			foreach (var file in dto.Images)
			{
				await using var fileStream = file.OpenReadStream();
				var fileUrl = await _staticFileManager.UploadFileAsync(fileStream, file.FileName);
				images.Add(new MediaFile
				{
					FileUrl = fileUrl,
					Type = MediaFileType.Image
				});
			}
			
			product.Images?.Clear();
			product.Images = images;
		}

		if (dto.Id is not null)
			await _productRepository.UpdateAsync(product);
		else
			await _productRepository.CreateAsync(product);
		
		return Ok();
	}

	private static ProductCategory ParseCategory(string category)
	{
		Enum.TryParse<ProductCategory>(category, out var result);
		return result;
	}
}