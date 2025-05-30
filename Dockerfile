# Usamos una imagen base de Node.js oficial con Playwright
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias sin modificar lockfile
RUN npm ci

# Copiar todo el proyecto
COPY . .

# Instalar navegadores necesarios para Playwright
RUN npx playwright install --with-deps

# Comando por defecto al ejecutar el contenedor
CMD ["npx", "playwright", "test"]
