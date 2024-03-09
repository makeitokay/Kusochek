using System.Text;
using Infrastructure;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

builder.Configuration.AddEnvironmentVariables(prefix: "KUSOCHEK_");

services.AddControllers();
services.AddEndpointsApiExplorer();

services.AddCors(options =>
{
	options.AddPolicy("CORSPolicy", b =>
	{
		b
			.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader();
	});
});

services
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidIssuer = Constants.Authentication.Issuer,
			ValidateAudience = true,
			ValidAudience = Constants.Authentication.Audience,
			ValidateLifetime = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DigitalDiarySecretKey2023")),
			ValidateIssuerSigningKey = true
		};
	});
services
	.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("Default");
services.AddDbContext(connectionString);

services.AddRepositories();
services.AddSingleton<IPasswordManager, PasswordManager>();

var app = builder.Build();

app.UseCors("CORSPolicy");

if (app.Environment.IsDevelopment())
{
    app.MapGet("/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
    {
	    var sb = new StringBuilder();
	    foreach (var endpoint in endpointSources.SelectMany(es => es.Endpoints))
	    {
		    sb.Append(endpoint.DisplayName + ": ");
 
		    if (endpoint is RouteEndpoint routeEndpoint)
		    { 
			    sb.AppendLine(routeEndpoint.RoutePattern.RawText);
		    }
	    }
	    return sb.ToString();
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();