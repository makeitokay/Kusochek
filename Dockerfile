### build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . ./
RUN dotnet restore "Kusochek.sln"
RUN dotnet build "Kusochek.sln"

### publish
FROM build as publish
RUN dotnet publish Kusochek -c Release -o out/Kusochek

### Kusochek
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as Kusochek
WORKDIR /app
COPY --from=publish /app/out/Kusochek .

EXPOSE 80

ENTRYPOINT ["dotnet", "Kusochek.dll"]