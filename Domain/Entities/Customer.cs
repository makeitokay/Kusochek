using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Customers")]
public class Customer : BaseUser
{
}