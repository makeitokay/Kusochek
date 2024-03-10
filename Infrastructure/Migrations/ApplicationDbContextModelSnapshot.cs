﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.MediaFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FileUrl")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FileUrl");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.ToTable("MediaFiles");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Cost")
                        .HasColumnType("numeric")
                        .HasColumnName("Cost");

                    b.Property<DateTimeOffset>("CreationDateTimeUtc")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreationDateTimeUtc");

                    b.Property<string>("DeliveryAddress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("DeliveryAddress");

                    b.Property<DateTimeOffset>("DeliveryDateTimeUtc")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("DeliveryDateTimeUtc");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("LastName");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Name");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Phone");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Status");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Domain.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Category");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Name");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric")
                        .HasColumnName("Price");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("Quantity");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision")
                        .HasColumnName("Weight");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Domain.Entities.ProductItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("OrderId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("ProductId");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("Quantity");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("ProductItems");
                });

            modelBuilder.Entity("Domain.Entities.Promotion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("ExpirationDateTimeUtc")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("ExpirationDateTimeUtc");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("ProductId");

                    b.Property<decimal>("PromotionPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("PromotionPrice");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Promotion");
                });

            modelBuilder.Entity("Domain.Entities.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("CreationDateTimeUtc")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreationDateTimeUtc");

                    b.Property<int>("Mark")
                        .HasColumnType("integer")
                        .HasColumnName("Mark");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("ProductId");

                    b.Property<string>("ReviewText")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("ReviewText");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Domain.Entities.Story", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("ExpirationDateTimeUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("PreviewImageId")
                        .HasColumnType("integer")
                        .HasColumnName("PreviewImageId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Title");

                    b.HasKey("Id");

                    b.HasIndex("PreviewImageId");

                    b.ToTable("Stories");
                });

            modelBuilder.Entity("Domain.Entities.StoryMediaFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("MediaFileId")
                        .HasColumnType("integer")
                        .HasColumnName("MediaFileId");

                    b.Property<int>("StoryId")
                        .HasColumnType("integer")
                        .HasColumnName("StoryId");

                    b.HasKey("Id");

                    b.HasIndex("MediaFileId");

                    b.HasIndex("StoryId");

                    b.ToTable("StoryMediaFiles");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("Id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FirstName");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("boolean")
                        .HasColumnName("IsAdmin");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("LastName");

                    b.Property<string>("MobilePhone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("MobilePhone");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("PasswordHash");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea")
                        .HasColumnName("PasswordSalt");

                    b.Property<int?>("ProfilePictureId")
                        .HasColumnType("integer")
                        .HasColumnName("ProfilePictureId");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("ProfilePictureId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@kusochek.site",
                            FirstName = "Admin",
                            IsAdmin = true,
                            LastName = "Kusochek",
                            MobilePhone = "79125556677",
                            PasswordHash = "E79B06F60D6344B5CD068D23EB165BA165E616F2CD15473F69CA747B6065911FB18AE463B38B225F68FEB005CA5CAAFDEC548F9DF879EC7C23AC35E9C5CC0E8D",
                            PasswordSalt = new byte[] { 190, 173, 182, 127, 238, 122, 171, 208, 134, 147, 62, 47, 77, 244, 3, 125 }
                        });
                });

            modelBuilder.Entity("MediaFileProduct", b =>
                {
                    b.Property<int>("ImagesId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductsId")
                        .HasColumnType("integer");

                    b.HasKey("ImagesId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("ProductImages", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.ProductItem", b =>
                {
                    b.HasOne("Domain.Entities.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId");

                    b.HasOne("Domain.Entities.Product", "Product")
                        .WithMany("ProductItems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("CartItems")
                        .HasForeignKey("UserId");

                    b.Navigation("Order");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.Promotion", b =>
                {
                    b.HasOne("Domain.Entities.Product", "Product")
                        .WithMany("Promotions")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Domain.Entities.Review", b =>
                {
                    b.HasOne("Domain.Entities.Product", "Product")
                        .WithMany("Reviews")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.Story", b =>
                {
                    b.HasOne("Domain.Entities.MediaFile", "PreviewImage")
                        .WithMany()
                        .HasForeignKey("PreviewImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PreviewImage");
                });

            modelBuilder.Entity("Domain.Entities.StoryMediaFile", b =>
                {
                    b.HasOne("Domain.Entities.MediaFile", "MediaFile")
                        .WithMany()
                        .HasForeignKey("MediaFileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Story", "Story")
                        .WithMany("Content")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MediaFile");

                    b.Navigation("Story");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.HasOne("Domain.Entities.MediaFile", "ProfilePicture")
                        .WithMany()
                        .HasForeignKey("ProfilePictureId");

                    b.Navigation("ProfilePicture");
                });

            modelBuilder.Entity("MediaFileProduct", b =>
                {
                    b.HasOne("Domain.Entities.MediaFile", null)
                        .WithMany()
                        .HasForeignKey("ImagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("Domain.Entities.Product", b =>
                {
                    b.Navigation("ProductItems");

                    b.Navigation("Promotions");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("Domain.Entities.Story", b =>
                {
                    b.Navigation("Content");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Navigation("CartItems");

                    b.Navigation("Orders");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
