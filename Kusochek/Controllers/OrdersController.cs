using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kusochek.Controllers;

[Route("orders")]
public class OrdersController : ControllerBase
{
	private readonly IRepository<Order> _orderRepository;
	private readonly IRepository<Product> _productRepository;
	private readonly IUserRepository _userRepository;
	private readonly IRepository<ProductItem> _productItemRepository;
	
	public OrdersController(
		IRepository<Order> orderRepository,
		IRepository<Product> productRepository,
		IUserRepository userRepository,
		IRepository<ProductItem> productItemRepository)
	{
		_orderRepository = orderRepository;
		_productRepository = productRepository;
		_userRepository = userRepository;
		_productItemRepository = productItemRepository;
	}

	[HttpPost]
	public async Task<IActionResult> CreateOrderAsync([FromBody] CreateOrderDto orderDto)
	{
		var user = User.Identity?.IsAuthenticated is true
			? await _userRepository.GetAsync(User.Claims.GetUserId())
			: null;

		var productItems = new List<ProductItem>();
		var updatedProducts = new List<Product>();
		var totalCost = 0m;
		
		foreach (var productItem in orderDto.ProductItems)
		{
			var product = await _productRepository.GetAsync(productItem.Id);
			if (product.Quantity < productItem.Quantity)
				return BadRequest();

			product.Quantity -= productItem.Quantity;
			updatedProducts.Add(product);
			productItems.Add(new ProductItem
			{
				Product = product,
				Quantity = productItem.Quantity
			});

			totalCost += product.ActualPrice * productItem.Quantity;
		}

		foreach (var product in updatedProducts)
			await UpdateAllCurrentCartsAsync(product.Id, product.Quantity, user);
		
		if (user is not null)
		{
			await _productItemRepository
				.Items
				.Where(pi => pi.User != null)
				.Where(pi => pi.User!.Id == user.Id)
				.ExecuteDeleteAsync();
		}

		await _productRepository.UpdateRangeAsync(updatedProducts);
		
		var order = new Order
		{
			Cost = totalCost,
			CreationDateTimeUtc = DateTimeOffset.UtcNow,
			Items = productItems,
			Status = OrderStatus.Accepted,
			User = user,
			Name = orderDto.Name,
			LastName = orderDto.LastName,
			DeliveryAddress = orderDto.DeliveryAddress,
			DeliveryDateTimeUtc = orderDto.DeliveryDate,
			Phone = orderDto.Phone
		};

		await _orderRepository.CreateAsync(order);
		
		return Ok();
	}

	[HttpGet]
	[Authorize]
	public async Task<IActionResult> GetOrdersAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		return Ok(user.Orders.Select(o => o.MapToOrderDto()));
	}

	[HttpGet("all")]
	[Authorize]
	public async Task<IActionResult> GetAllOrdersAsync()
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();

		var orders = await _orderRepository
			.Items
			.Where(o => o.Status != OrderStatus.Completed && o.Status != OrderStatus.Cancelled)
			.ToListAsync();

		return Ok(orders.Select(o => o.MapToOrderDto()));
	}

	[HttpPost("{orderId:int}")]
	[Authorize]
	public async Task<IActionResult> EditOrderAsync(int orderId, [FromBody] EditOrderDto dto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();

		Enum.TryParse<OrderStatus>(dto.Status, out var status);
		var order = await _orderRepository.GetAsync(orderId);
		order.Status = status;
		await _orderRepository.UpdateAsync(order);

		if (status is OrderStatus.Cancelled)
		{
			var updatedProducts = new List<Product>();
			foreach (var productItem in order.Items)
			{
				productItem.Product.Quantity += productItem.Quantity;
				updatedProducts.Add(productItem.Product);
			}

			await _productRepository.UpdateRangeAsync(updatedProducts);
		}
		
		return Ok();
	}

	private async Task UpdateAllCurrentCartsAsync(int productId, int newQuantity, User? user)
	{
		var productItems = await _productItemRepository
			.Items
			.Where(pi => pi.ProductId == productId)
			.Where(pi => pi.User != null)
			.Where(pi => pi.Quantity > newQuantity)
			.ToListAsync();

		foreach (var productItem in productItems)
		{
			if (user is not null && productItem.User!.Id == user.Id)
				continue;
			productItem.Quantity = newQuantity;
		}

		await _productItemRepository.UpdateRangeAsync(productItems);
	}
}