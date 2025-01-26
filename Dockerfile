# Usar Node 22 en una imagen más ligera
FROM node:22-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias primero (para cachear dependencias)
COPY package*.json ./

# Instalar dependencias, incluyendo las de desarrollo
RUN npm install

# Copiar el código fuente al contenedor
COPY . .

# Exponer los puertos necesarios para la aplicación Nuxt
EXPOSE 3000

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "run", "dev"]