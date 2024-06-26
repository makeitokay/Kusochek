﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("ProductItems")]
public class ProductItem : BaseEntity
{
	public virtual Product Product { get; set; }
	
	[Column("ProductId")]
	public int ProductId { get; set; }
	
	[Column("Quantity")]
	public int Quantity { get; set; }
	
	public virtual Order? Order { get; set; }
	
	public virtual User? User { get; set; }
}