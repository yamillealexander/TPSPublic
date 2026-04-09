# syntax=docker/dockerfile:1.7
#
# Single-container build for Tus Placas Seguras:
#   1. Build the React SPA with Node.
#   2. Build the .NET 10 Minimal API with the dotnet SDK.
#   3. Run the API on the aspnet runtime, with the React build copied
#      into wwwroot so the same process serves both the static SPA and
#      the /api/* endpoints.

# ---- Stage 1: build React -----------------------------------------------
FROM node:20-alpine AS web-builder
WORKDIR /web

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html postcss.config.js tailwind.config.js vite.config.js eslint.config.js ./
COPY public ./public
COPY src ./src

RUN npm run build
# Output: /web/dist


# ---- Stage 2: build .NET ------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS dotnet-builder
WORKDIR /src

# Restore deps in their own layer for better caching
COPY server/TpsWeb.Api.csproj server/
RUN dotnet restore server/TpsWeb.Api.csproj

COPY server/ server/
RUN dotnet publish server/TpsWeb.Api.csproj \
        -c Release \
        -o /app/publish \
        /p:UseAppHost=false


# ---- Stage 3: runtime ---------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app

# .NET app binaries
COPY --from=dotnet-builder /app/publish ./

# React build → wwwroot (served by app.UseStaticFiles())
COPY --from=web-builder /web/dist ./wwwroot

# DO App Platform expects HTTP on $PORT (default 8080)
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENV DOTNET_RUNNING_IN_CONTAINER=true

EXPOSE 8080

ENTRYPOINT ["dotnet", "TpsWeb.Api.dll"]
