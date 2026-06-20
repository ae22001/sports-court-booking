#1: Build de React con Node
FROM node:22-alpine AS build
WORKDIR /app
# Copiamos todos los archivos de configuración de dependencias que existan
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#2: Servidor Nginx para producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]