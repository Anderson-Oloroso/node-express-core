# 1. Imagen base oficial de Node.js (LTS Alpine)
FROM node:20-alpine

# 2. Directorio de trabajo de la aplicación
WORKDIR /app

# 3. Copiar manifiestos de dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el código fuente completo
COPY . .

# 6. Exponer el puerto de la aplicación
EXPOSE 3000

# 7. Comando de inicio en desarrollo
CMD ["npm", "run", "dev"]