# 🚀 Node Express Core

> Repositorio central de aprendizaje, laboratorios prácticos y arquitectura backend con **Node.js**, **Express.js**, **MySQL** y **Docker**.

---

## 📖 Descripción del Proyecto

**`node-express-core`** es un entorno de desarrollo estructurado de manera modular para dominar los fundamentos y las técnicas avanzadas del ecosistema backend en Node.js y Express con persistencia en **MySQL**.

Abarca desde la creación de servidores HTTP RESTful, middlewares y persistencia relacional con el driver oficial `mysql2` mediante Connection Pools, hasta la implementación de patrones de arquitectura empresarial como **DTOs**, **MVC**, control de tráfico con **Rate Limiting**, manejo seguro de **Cookies** y autenticación robusta basada en **JWT con Passport.js**.

Todo el entorno se encuentra completamente **contenedorizado con Docker Compose**, permitiendo ejecutar tanto el servidor central como cualquiera de los módulos de manera independiente y sin conflictos de puertos.

---

## 🛠️ Tecnologías y Herramientas

* **Runtime:** Node.js (v20+ LTS Alpine, ESM nativo)
* **Framework Web:** Express.js (v5+)
* **Base de Datos Relacional:** MySQL (v8.0)
* **Driver DB:** `mysql2` (Connection Pool con promesas y sentencias preparadas)
* **Contenedores:** Docker & Docker Compose
* **Cliente de Pruebas de APIs:** [Bruno](https://www.usebruno.com/)
* **Herramientas de Desarrollo:** Nodemon, Dotenv

---

## 📚 Módulos del Proyecto

Cada módulo cuenta con su propio archivo de documentación detallado con explicaciones conceptuales, endpoints, esquemas de bases de datos y guías de prueba:

| Módulo | Tema / Enfoque | Colección Bruno | Documentación Detallada |
| :--- | :--- | :---: | :---: |
| **01** | **Introducción a Node.js & Express:** Ciclo de vida HTTP, variables de entorno y servidor básico. | — | [📖 Ver README Módulo 01](src/modules/01-intro-node-express/README.md) |
| **02** | **Funcionalidades de Express:** `express.Router()`, middlewares de headers y control de acceso. | `bruno/module-02` | [📖 Ver README Módulo 02](src/modules/02-function-express/README.md) |
| **03** | **Conexión a MySQL con `mysql2`:** Connection Pool, consultas preparadas, scripts SQL y CRUD completo. | `bruno/module-03` | [📖 Ver README Módulo 03](src/modules/03-connection-mysql/README.md) |

---

## 🚀 Inicio Rápido con Docker

El proyecto está configurado para que la infraestructura (Node.js en modo espera interactivo + base de datos MySQL 8.0) se levante una sola vez con Docker Compose:

### 1. Clonar y configurar variables de entorno
```bash
git clone https://github.com/Anderson-Oloroso/node-express-core.git
cd node-express-core
cp .env.example .env
```

### 2. Levantar la infraestructura
```bash
docker compose up -d --build
```

* 🌐 **API Express:** `http://localhost:3000`
* 🐬 **MySQL:** `localhost:3307` *(Host externo mapeado a 3306 interno de Docker)*

---

## 🎮 Ejecución Modular (Independencia Total)

Gracias a la configuración de Docker con modo interactivo en espera (`tail -f /dev/null`), puedes ejecutar cualquier script sin colisiones de puertos ni dependencias cruzadas:

### Opción 1: Mediante `docker compose exec` (Directo desde la terminal de tu PC)
```bash
# Servidor principal (Health check & estatus)
docker compose exec api npm run dev

# Módulo 01: Introducción a Express
docker compose exec api npm run module-01

# Módulo 02: Rutas y Middlewares
docker compose exec api npm run module-02

# Módulo 03: API de Productos con MySQL
docker compose exec api npm run module-03
```

### Opción 2: Entrando a la consola interactiva del contenedor
```bash
# Entrar al contenedor
docker exec -it express_core_api sh

# Dentro de /app puedes ejecutar el comando que desees:
npm run dev        # Detén con Ctrl + C
npm run module-02  # Detén con Ctrl + C
npm run module-03  # Detén con Ctrl + C
```

---

## 🧪 Pruebas de API con Bruno

Las colecciones de Bruno se encuentran versionadas en la carpeta `bruno/`:
* [bruno/module-02/](bruno/module-02): Pruebas de rutas de estudiantes y validación del header `role: admin`.
* [bruno/module-03/](bruno/module-03): Pruebas CRUD completas de la entidad productos conectada a MySQL.

---

## 👨‍💻 Autor
* **Anderson Oloroso** - [@Anderson-Oloroso](https://github.com/Anderson-Oloroso)
