using System.Text.Json;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
	public DbSet<Customer> Users => Set<Customer>();
	public DbSet<KusochekAdmin> KusochekAdmins => Set<KusochekAdmin>();

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder
			.Entity<Customer>()
			.HasIndex(u => new { u.Email })
			.IsUnique();

		foreach (var entityType in modelBuilder.Model.GetEntityTypes())
		{
			foreach (var property in entityType.GetProperties())
			{
				if (!property.ClrType.IsEnum) continue;
				var type = typeof(EnumToStringConverter<>).MakeGenericType(property.ClrType);
				var converter = Activator.CreateInstance(type, new ConverterMappingHints()) as ValueConverter;

				property.SetValueConverter(converter);
			}
		}
		
		modelBuilder.Entity<KusochekAdmin>()
			.HasData(new KusochekAdmin
			{
				Id = 1,
				Email = "admin@kusochek.site",
				PasswordHash =
					"E79B06F60D6344B5CD068D23EB165BA165E616F2CD15473F69CA747B6065911FB18AE463B38B225F68FEB005CA5CAAFDEC548F9DF879EC7C23AC35E9C5CC0E8D",
				PasswordSalt = [190, 173, 182, 127, 238, 122, 171, 208, 134, 147, 62, 47, 77, 244, 3, 125],
				FirstName = "Admin",
				LastName = "Kusochek"
			});
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder
			.UseLazyLoadingProxies();
	}
}