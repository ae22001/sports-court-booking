
# sports-court-booking
Gestion y reserva de canchas

## Integrantes
Rodrigo Alexander Aguilar De Evian - AE22001
<br/>Samuel Timoteo Cortez Hernandez   - CH21024
<br/>Luis Daniel Contreras Rivera - CR11019
<br/>Katherine Tatiana Hernandez Hernandez - HH20017
<br/>Josue Alexander Najarro Cardoza - NC23009  

# ⚽ Sports Court Booking - Sistema de Reservas de Canchas de Fútbol

##  Manual de Despliegue

A continuación, se detallan las instrucciones paso a paso para compilar y levantar el sistema completo utilizando la infraestructura como código de Docker Compose.

### 📋 Requisitos Previos
1. **Docker:** Tener instalado Docker Desktop (en Windows/Mac) o el motor de Docker (en Linux) y asegurarse de que el servicio esté en ejecución.
2. **Base de Datos:** Tener instalado PostgreSQL de forma local (nativa) y en ejecución. Debe existir una base de datos configurada con los siguientes parámetros:
    * Nombre de la base de datos: `canchas_db`
    * Usuario: `postgres`
    * Contraseña: `password123`

### ⚙️ Instrucciones de Ejecución

**Paso 1: Ubicarse en el proyecto**
Abre tu terminal preferida (PowerShell, CMD o bash) y navega hasta la carpeta raíz del repositorio:
```bash
cd sports-court-booking
```
**Paso 2: Levantar la infraestructura**
Ejecuta el comando de orquestación para construir las imágenes optimizadas y levantar los contenedores en segundo plano:
```bash
docker compose up --build -d
```
**Paso 3: Validar el despliegue**
Comprueba que los contenedores integrados (app_backend y app_frontend) se hayan creado y mantengan el estado Up (corriendo):
```bash
docker compose ps
```

**Paso 4: Acceder al sistema**
Una vez levantados los servicios, accede a la aplicación desde tu navegador web:

Frontend (Interfaz de Usuario): Ingresa a http://localhost

Backend (API): El servicio se ejecuta en el puerto 8081.

**Paso 5: Detener y limpiar el sistema**
Cuando finalices la sesión y desees apagar los contenedores de forma segura, ejecuta:
```bash
docker compose down
```
## Evidencias de Funcionamiento
   A continuación, se presentan las evidencias de la correcta ejecución de la API y la integración con la interfaz de usuario.

### Documentación en Swagger
![Evidencia de Swagger API](./docs/swagger.png)

### Tabla de Rutas (Endpoints) del Backend
El backend expone una API RESTful para la gestión de las canchas de fútbol y el historial de reservas. URL Base: http://localhost:8081/api/v1
![Evidencia de endpoints](./docs/endpoints.png)

## Capturas de las Vistas (Frontend)

### Vista Principal (Listado y Registro de Canchas, historial de reservas):
![Vista de Canchas](./docs/canchas.png)

### Vista principal de Reservas:
![Vista de Reservas](./docs/reservas.png)