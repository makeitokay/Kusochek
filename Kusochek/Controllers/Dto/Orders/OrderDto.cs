using Domain.Entities;

namespace Kusochek.Controllers.Dto.Orders;

public class OrderDto : CreateOrderDto
{
	public string Status { get; set; }
	public DateTimeOffset CreationDateTimeUtc { get; set; }
	public decimal Cost { get; set; }
	
	public int Id { get; set; }
}

public static class OrderDtoExtensions
{
	public static OrderDto MapToOrderDto(this Order order)
	{
		return new OrderDto
		{
			CreationDateTimeUtc = order.CreationDateTimeUtc,
			Status = order.Status.ToString(),
			DeliveryAddress = order.DeliveryAddress,
			DeliveryDate = order.DeliveryDateTimeUtc,
			LastName = order.LastName,
			Name = order.Name,
			Phone = order.Phone,
			ProductItems = order.Items.Select(item => new OrderProductItemDto
			{
				Id = item.Id, Quantity = item.Quantity
			}),
			Cost = order.Cost,
			Id = order.Id
		};
	}
} 