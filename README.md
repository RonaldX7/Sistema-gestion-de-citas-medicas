# 🏥 Sistema de Gestión de Citas Médicas

📌 **Proyecto desarrollado como parte del curso Integrador II en la Universidad Tecnológica del Perú**. Este sistema permite la gestión eficiente de citas médicas, facilitando la programación, confirmación y seguimiento de las mismas.

## ✨ Características

- 🗓️ **Programación de citas**: Permite a los pacientes agendar citas con diferentes especialistas de manera sencilla.
- ✅ **Confirmación de citas**: Los pacientes pueden confirmar, cancelar o reprogramar sus citas.
- 📋 **Gestión de disponibilidad**: Los profesionales de la salud pueden administrar su agenda y disponibilidad.
- 🔔 **Notificaciones**: Envía recordatorios y notificaciones a los pacientes sobre sus citas.

## 🛠️ Tecnologías Utilizadas

- ☕ **Backend**: Java con Spring Boot  
- 🌐 **Frontend**: Angular  
- 🗄️ **Base de Datos**: MySQL  
- 🧰 **Control de Versiones**: Git  

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/RonaldX7/Sistema-gestion-de-citas-medicas.git
```
### 2️⃣ Configurar el Backend
- 📂 Navegar al directorio back_soa:
```bash
cd Sistema-gestion-de-citas-medicas/back_soa
```
- 🛠️ Construir el proyecto con Maven:
```bash
mvn clean install
```
- ▶️ Ejecutar la aplicación:
```bash
mvn spring-boot:run
```
### 3️⃣ Configurar el Frontend
- 📂 Navegar al directorio front_soa:
```bash
cd ../front_soa
```
- 📦 Instalar las dependencias:
```bash
npm install
```
- ▶️ Ejecutar la aplicación:
```bash
ng serve
```
### 4️⃣ Ejecutar el Script de Base de Datos
- 📄 Ubica el archivo database_script.sql en el del repositorio.
- ⚙️ Abre tu gestor de base de datos (por ejemplo, MySQL Workbench).
- 🗄️ Crea una base de datos:
```bash
CREATE DATABASE holomedic_db;
```
- 📤 Importa el archivo database_script.sql a la base de datos creada.
- 🔗 Configura las credenciales de conexión a la base de datos en el archivo application.properties (ubicado en el directorio src/main/resources):
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/holomedic_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```
## 🌟 Uso
- 🌐 Accede a la interfaz web del sistema a través de http://localhost:4200.
- 👤 Registra usuarios y pacientes según sea necesario.
- 🗓️ Utiliza las funcionalidades de programación y gestión de citas disponibles en la plataforma.


