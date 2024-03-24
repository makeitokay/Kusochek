using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kusochek.Controllers;

[Route("cart")]
[Authorize]
public class CartController : ControllerBase
{
	private readonly IRepository<Product> _productRepository;
	private readonly IUserRepository _userRepository;
	private readonly IRepository<ProductItem> _productItemRepository;

	public CartController(
		IRepository<Product> productRepository, IUserRepository userRepository, IRepository<ProductItem> productItemRepository)
	{
		_productRepository = productRepository;
		_userRepository = userRepository;
		_productItemRepository = productItemRepository;
	}

	[HttpPost("{productId:int}")]
	public async Task<IActionResult> AddProductToCartAsync(int productId)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		var currentCart = user.CartItems;
		
		var product = await _productRepository.GetAsync(productId);
		var currentProductItem = currentCart.SingleOrDefault(pi => pi.ProductId == productId);
		if (currentProductItem is not null)
		{
			if (currentProductItem.Quantity + 1 > product.Quantity)
			{
				return BadRequest();
			}

			currentProductItem.Quantity += 1;
			await _productItemRepository.UpdateAsync(currentProductItem);
			return Ok();
		}

		if (product.Quantity <= 0) return BadRequest();
		currentCart.Add(new ProductItem
		{
			Product = product,
			Quantity = 1
		});

		await _userRepository.UpdateAsync(user);
		return Ok();

	}

	[HttpDelete("{productId:int}")]
	public async Task<IActionResult> RemoveProductFromCartAsync(int productId)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		var currentCart = user.CartItems;
		
		var currentProductItem = currentCart.SingleOrDefault(pi => pi.ProductId == productId);

		if (currentProductItem is null)
			return BadRequest();

		if (currentProductItem.Quantity - 1 == 0)
		{
			await _productItemRepository.DeleteAsync(currentProductItem);
			return Ok();
		}
		
		currentProductItem.Quantity -= 1;

		await _productItemRepository.UpdateAsync(currentProductItem);
		return Ok();
	}

	[HttpGet]
	public async Task<IActionResult> GetCartAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		var currentCart = user.CartItems;
		return Ok(new
		{
			totalCost = currentCart.Sum(pi => pi.Product.ActualPrice * pi.Quantity),
			products = currentCart.Select(pi => pi.Product.MapToCartProductDto(pi.Quantity))
		});
	}
}