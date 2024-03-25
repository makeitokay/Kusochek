using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface IUserRepository : IRepository<User>
{
	Task<User?> TryGetByEmailAsync(string email);
	Task<User?> TryGetByVkIdAsync(long vkId);
}

public class UserRepository : Repository<User>, IUserRepository
{
	public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<User?> TryGetByEmailAsync(string email)
	{
		return await Set.SingleOrDefaultAsync(user => user.Email == email);
	}

	public async Task<User?> TryGetByVkIdAsync(long vkId)
	{
		return await Set.SingleOrDefaultAsync(user => user.VkId == vkId);
	}
}