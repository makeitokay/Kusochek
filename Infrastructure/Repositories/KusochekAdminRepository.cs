using Domain.Entities;

namespace Infrastructure.Repositories;

public interface IKusochekAdminRepository : IBaseUserRepository<KusochekAdmin>
{
	
}

public class KusochekAdminRepository : BaseUserRepository<KusochekAdmin>, IKusochekAdminRepository
{
	public KusochekAdminRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}