﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
	Task<TEntity> CreateAsync(TEntity entity);
	Task<TEntity> UpdateAsync(TEntity entity);
	Task<TEntity> GetAsync(int id);
	IQueryable<TEntity> Items { get; }
}

public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
	protected ApplicationDbContext DbContext { get; }

	protected DbSet<TEntity> Set { get; }

	public IQueryable<TEntity> Items => Set.AsQueryable();

	public Repository(ApplicationDbContext dbContext)
	{
		DbContext = dbContext;
		Set = dbContext.Set<TEntity>();
	}

	public async Task<TEntity> CreateAsync(TEntity entity)
	{
		Set.Add(entity);
		await DbContext.SaveChangesAsync();
		return entity;
	}

	public async Task<TEntity> UpdateAsync(TEntity entity)
	{
		Set.Update(entity);
		await DbContext.SaveChangesAsync();
		return entity;
	}

	public async Task<TEntity> GetAsync(int id)
	{
		return await Set.FindAsync(id) ?? throw new ArgumentException($"Entity with id = {id} not found");
	}
}