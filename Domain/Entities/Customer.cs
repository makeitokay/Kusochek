using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Customers")]
public sealed class Customer : BaseUser
{
}