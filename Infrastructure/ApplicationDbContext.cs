using System.Text.Json;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
	public DbSet<User> Users => Set<User>();
	public DbSet<MediaFile> MediaFiles => Set<MediaFile>();
	public DbSet<Product> Products => Set<Product>();

	public DbSet<Order> Orders => Set<Order>();

	public DbSet<Review> Reviews => Set<Review>();

	public DbSet<Story> Stories => Set<Story>();


	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder
			.Entity<User>()
			.HasIndex(u => new { u.Email })
			.IsUnique();
		
		modelBuilder.Entity<MediaFile>()
			.HasDiscriminator<string>("Discriminator")
			.HasValue<Image>("Image")
			.HasValue<Video>("Video");

		modelBuilder.Entity<Product>()
			.HasMany(p => p.Images)
			.WithMany(i => i.Products)
			.UsingEntity(builder => builder.ToTable("ProductImages"));
		
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
		
		modelBuilder.Entity<User>()
			.HasData(new User
			{
				Id = 1,
				Email = "admin@kusochek.site",
				PasswordHash =
					"E79B06F60D6344B5CD068D23EB165BA165E616F2CD15473F69CA747B6065911FB18AE463B38B225F68FEB005CA5CAAFDEC548F9DF879EC7C23AC35E9C5CC0E8D",
				PasswordSalt = [190, 173, 182, 127, 238, 122, 171, 208, 134, 147, 62, 47, 77, 244, 3, 125],
				FirstName = "Admin",
				LastName = "Kusochek",
				MobilePhone = "79125556677",
				IsAdmin = true
			});
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder
			.UseLazyLoadingProxies();
	}
}