# 🚀 Node Express Core

> Repositorio central de aprendizaje, laboratorios prácticos y arquitectura backend con **Node.js**, **Express.js**, **MySQL** y **Docker**.

---

## 📖 Descripción del Proyecto

**`node-express-core`** es un espacio de desarrollo modular diseñado para dominar los fundamentos y las técnicas avanzadas del ecosistema backend con Node.js y Express. 

El proyecto abarca desde la creación de servidores HTTP RESTful, middlewares y persistencia relacional con MySQL, hasta la implementación de patrones de arquitectura empresarial como **DTOs**, **MVC**, control de tráfico con **Rate Limiting**, manejo seguro de **Cookies** y autenticación robusta basada en **JWT con Passport.js**.

Todo el entorno se encuentra completamente **contenedorizado con Docker Compose**, garantizando un despliegue homogéneo, aislado y portátil.

---

## 🛠️ Tecnologías y Herramientas

* **Runtime:** Node.js (v20+ ESM)
* **Framework Web:** Express.js (v5+)
* **Base de Datos Relacional:** MySQL (v8.0)
* **Driver DB:** `mysql2` (Connection Pool con promesas)
* **Contenedores:** Docker & Docker Compose
* **Seguridad & Auth:** Passport.js, JWT, Bcrypt, Express Rate Limit, Cookie Parser

---

## 📅 Calendario y Temario del Curso

| Módulo | Sesión | Tema Oficial | Fecha |
| :--- | :---: | :--- | :---: |
| **Módulo 1: Fundamentos** | **01** | Introducción a NodeJS con ExpressJS | `08/Oct` |
| **Módulo 2: Servidor & MongoDB** | **02** | Aplicación de Funcionalidades de ExpressJS | `09/Oct` |
| | **03** | Conexión a las bases de datos MongoDB | `12/Oct` |
| **Módulo 3: Validación & Almacenamiento** | **04** | Implementación de DTO (Data Transfer Object) | `13/Oct` |
| | **05** | Implementación de Cookies en Node.js | `14/Oct` |
| **Módulo 4: Versionado & Seguridad** | **06** | Versionado Semántico (SemVer) | `15/Oct` |
| | **07** | Límite de peticiones con `express-rate-limit` | `16/Oct` |
| **Módulo 5: Arquitectura & Auth** | **08** | Fundamentos de Modelo-Vista-Controlador (MVC) | `19/Oct` |
| | **09** | Autenticación con JWT mediante Passport.js | `20/Oct` |

---

## 🚀 Inicio Rápido con Docker

### 1. Clonar el repositorio
```bash
git clone https://github.com/Anderson-Oloroso/node-express-core.git
cd node-express-core
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

### 3. Levantar los contenedores (API + MySQL)
```bash
docker compose up -d --build
```

* 🌐 **API Express:** `http://localhost:3000`
* 🐬 **MySQL:** `localhost:3307`

## 🧩 Ejecutar el módulo 03 (MySQL)

El módulo 03 carga únicamente su configuración desde
`src/modules/03-connection-mysql/.env`; no depende del `.env` de la raíz ni cambia
la configuración de los módulos anteriores.

1. Inicia MySQL con Docker Compose desde la raíz del proyecto:

   ```bash
   docker compose up -d mysql
   ```

2. Completa `src/modules/03-connection-mysql/.env` usando
   `src/modules/03-connection-mysql/.env.example` como referencia. Si ejecutas el
   módulo dentro del contenedor `api`, usa `DB_HOST=mysql` y `DB_PORT=3306`.
   `DB_PASSWORD` debe coincidir con `DB_ROOT_PASSWORD` del `.env` de la raíz.
   Este acceso como root es solo para el ejercicio local. Si ejecutas Node
   directamente en tu computadora, usa `DB_HOST=127.0.0.1` y `DB_PORT=3307`.

3. Ejecuta el SQL una vez para crear la base `campus` y cargar sus productos:

   ```bash
   docker compose exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --default-character-set=utf8mb4 -uroot' < src/modules/03-connection-mysql/database/01-init.sql
   ```

4. Desde la raíz, inicia únicamente el módulo 03 dentro del contenedor:

   ```bash
   docker compose exec api npm run module-03
   ```

   Abre `http://localhost:3003/productos` para comprobar la conexión. El SQL
   puede ejecutarse de nuevo para actualizar los productos de ejemplo. Si
   prefieres ejecutarlo directamente en tu computadora, usa `npm run module-03`
   y los valores `127.0.0.1:3307` en el `.env` del módulo.

---

## 👨‍💻 Autor
* **Anderson Oloroso** - [@Anderson-Oloroso](https://github.com/Anderson-Oloroso)
