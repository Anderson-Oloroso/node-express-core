# 🚀 Node Express Core

> Repositorio central de aprendizaje, laboratorios prácticos y arquitectura backend con **Node.js**, **Express.js**, **MongoDB** y **Docker**.

---

## 📖 Descripción del Proyecto

**`node-express-core`** es un espacio de desarrollo modular diseñado para dominar los fundamentos y las técnicas avanzadas del ecosistema backend con Node.js y Express. 

El proyecto abarca desde la creación de servidores HTTP RESTful, middlewares y persistencia NoSQL con Mongoose, hasta la implementación de patrones de arquitectura empresarial como **DTOs**, **MVC**, control de tráfico con **Rate Limiting**, manejo seguro de **Cookies** y autenticación robusta basada en **JWT con Passport.js**.

Todo el entorno se encuentra completamente **contenedorizado con Docker Compose**, garantizando un despliegue homogéneo, aislado y portátil.

---

## 🛠️ Tecnologías y Herramientas

* **Runtime:** Node.js (v20+ ESM)
* **Framework Web:** Express.js (v5+)
* **Base de Datos NoSQL:** MongoDB (v6.0)
* **ODM / Modelado:** Mongoose (v9+)
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

### 3. Levantar los contenedores (API + MongoDB)
```bash
docker compose up --build
```

* 🌐 **API Express:** `http://localhost:3000`
* 🍃 **MongoDB:** `localhost:27017`

---

## 👨‍💻 Autor
* **Anderson Oloroso** - [@Anderson-Oloroso](https://github.com/Anderson-Oloroso)
