using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StoreFilesAsUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "MediaFiles");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "MediaFiles");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "MediaFiles");

            migrationBuilder.AddColumn<string>(
                name: "FileUrl",
                table: "MediaFiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "MediaFiles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileUrl",
                table: "MediaFiles");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "MediaFiles");

            migrationBuilder.AddColumn<byte[]>(
                name: "Content",
                table: "MediaFiles",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "MediaFiles",
                type: "character varying(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "MediaFiles",
                type: "text",
                nullable: true);
        }
    }
}
