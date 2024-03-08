using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface ICustomerRepository : IBaseUserRepository<Customer>
{
}

public class CustomerRepository : BaseUserRepository<Customer>, ICustomerRepository
{
	public CustomerRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}