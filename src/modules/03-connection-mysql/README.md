# 📦 Módulo 03: Conexión a Base de Datos MySQL con Express.js (`mysql2`)

> **Ruta de aprendizaje:** Persistencia Relacional y Operaciones CRUD  
> **Tema:** Conexión a base de datos MySQL 8.0 mediante Connection Pool (`mysql2/promise`), consultas preparadas contra SQL Injection, scripts de inicialización DDL/DML y operaciones CRUD completas.

---

## 🎯 Objetivos de Aprendizaje
* Configurar y gestionar un pool de conexiones persistente con `mysql2/promise`.
* Prevenir vulnerabilidades de **SQL Injection** mediante consultas parametrizadas y preparadas con `pool.execute()` y marcadores posicionales (`?`).
* Implementar operaciones CRUD completas (Create, Read, Update) sobre la tabla relacional `productos`.
* Utilizar funciones SQL como `IFNULL()` para actualizaciones parciales en sentencias `UPDATE`.
* Aislar la configuración del módulo mediante un archivo `.env` específico y resolución de ruta con `import.meta.url`.
* Automatizar la creación del esquema y datos iniciales mediante scripts SQL (`01-init.sql`).
* Implementar middlewares globales para captura de rutas 404 y control centralizado de errores.

---

## 📂 Estructura del Módulo

```text
src/modules/03-connection-mysql/
├── .env.example             # Plantilla de variables de entorno específicas del módulo
├── config/
│   └── database.js          # Configuración del Connection Pool con mysql2/promise
├── database/
│   └── 01-init.sql          # Script DDL (CREATE TABLE) y DML (INSERT iniciales)
├── routes/
│   └── productos.router.js  # Endpoints CRUD de la entidad productos
├── server.js                # Servidor Express, carga de entorno y manejo de errores
└── README.md                # Documentación del módulo
```

---

## 🗄️ Modelo de Base de Datos (`database/01-init.sql`)

El script crea la base de datos `campus` y la tabla `productos` con tipos estrictos y restricciones:

```sql
CREATE DATABASE IF NOT EXISTS campus;
USE campus;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo CHAR(4) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(250),
    precio DECIMAL(8, 2) NOT NULL,
    activo TINYINT CHECK (activo = 0 || activo = 1) DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Incluye además semillas de datos con cláusula `ON DUPLICATE KEY UPDATE` para permitir re-ejecuciones seguras e idempotentes.

---

## 🛣️ Endpoints de la API (`/productos`)

Todos los endpoints están montados bajo el prefijo `/productos`:

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/productos` | Obtiene el listado completo de productos. | `200 OK` |
| `GET` | `/productos/:id` | Obtiene el producto por su ID numérico. | `200 OK`, `404 Not Found` |
| `POST` | `/productos` | Registra un nuevo producto (`codigo`, `nombre`, `precio`, `descripcion`). | `201 Created`, `400 Bad Request` |
| `PUT` | `/productos/:id` | Actualiza campos de un producto usando `IFNULL()`. | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## ⚙️ Configuración de Variables de Entorno

Crea el archivo `.env` dentro de la carpeta `src/modules/03-connection-mysql/`:

```bash
cp src/modules/03-connection-mysql/.env.example src/modules/03-connection-mysql/.env
```

Contenido para ejecución en **Docker Compose** (Recomendado):
```env
HOST=0.0.0.0
PORT=3003
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root123
DB_NAME=campus
```

> [!NOTE]
> Si deseas ejecutar Node directamente en tu sistema operativo fuera de Docker, usa `DB_HOST=127.0.0.1` y `DB_PORT=3307` (el puerto externo mapeado por Docker para MySQL).

---

## 🚀 Inicialización y Ejecución Paso a Paso

### 1. Iniciar el servicio de MySQL en Docker
Desde la raíz del proyecto:
```bash
docker compose up -d mysql
```

### 2. Cargar el script SQL inicial (`01-init.sql`)
Ejecuta el script SQL en el contenedor para crear la base `campus` y poblar los productos:

```bash
docker compose exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --default-character-set=utf8mb4 -uroot' < src/modules/03-connection-mysql/database/01-init.sql
```

### 3. Ejecutar el servidor del Módulo 03

#### En Docker (Recomendado):
```bash
docker compose exec api npm run module-03
```
O dentro de la terminal interactiva:
```bash
docker exec -it express_core_api sh
npm run module-03
```

#### En máquina local:
```bash
npm run module-03
```

El servidor estará escuchando en `http://localhost:3003`.

---

## 🧪 Pruebas con Bruno

La colección de pruebas se encuentra en [bruno/module-03/](file:///c:/Users/Henrik/Downloads/Extras/Node.js/express/node-express-core/bruno/module-03):

* **`Get productos.yml`:** Consulta general (`GET http://localhost:3003/productos`).
* **`Find One.yml`:** Consulta de un producto por ID (`GET http://localhost:3003/productos/1`).
* **`Create.yml`:** Registro de un nuevo producto enviando el payload JSON (`POST http://localhost:3003/productos`).
* **`Update.yml`:** Actualización parcial o total de atributos (`PUT http://localhost:3003/productos/1`).
