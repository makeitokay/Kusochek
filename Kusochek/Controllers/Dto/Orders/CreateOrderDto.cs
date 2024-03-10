namespace Kusochek.Controllers.Dto.Orders;

public class CreateOrderDto
{
	public IEnumerable<OrderProductItemDto> ProductItems { get; set; }
	public string Name { get; set; }
	public string LastName { get; set; }
	public string Phone { get; set; }
	public string DeliveryAddress { get; set; }
	public DateTimeOffset DeliveryDate { get; set; }
}

public class OrderProductItemDto
{
	public int Id { get; set; }
	public int Quantity { get; set; }
}