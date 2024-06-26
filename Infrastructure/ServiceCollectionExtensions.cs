﻿using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class ServiceCollectionExtensions
{
	public static void AddDbContext(this IServiceCollection services, string? connectionString)
	{
		services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
	}

	public static void AddRepositories(this IServiceCollection services)
	{
		services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
		services.AddScoped<IUserRepository, UserRepository>();
	}
}