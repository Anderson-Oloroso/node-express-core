# 📦 Módulo 03: Conexión a Base de Datos MySQL con Express.js (`mysql2`)

> **Ruta de aprendizaje:** Persistencia Relacional y Operaciones CRUD  
> **Tema:** Conexión a MySQL 8.0 mediante Connection Pool (`mysql2/promise`), consultas preparadas, validación de entradas y operaciones sobre productos y usuarios.

---

## 🎯 Objetivos de Aprendizaje
* Configurar y gestionar un pool de conexiones persistente con `mysql2/promise`.
* Prevenir vulnerabilidades de **SQL Injection** mediante consultas parametrizadas y preparadas con `pool.execute()` y marcadores posicionales (`?`).
* Implementar operaciones para consultar y modificar productos, y crear y consultar usuarios.
* Utilizar funciones SQL como `IFNULL()` para actualizaciones parciales en sentencias `UPDATE`.
* Validar los datos de creación de usuarios con `express-validator`.
* Aislar la configuración del módulo mediante un archivo `.env` específico y resolución de ruta con `import.meta.url`.
* Automatizar la creación del esquema y datos iniciales mediante scripts SQL (`01-init.sql`).
* Implementar middlewares para rutas no encontradas y manejo centralizado de errores.

---

## 📂 Estructura del Módulo

```text
src/modules/03-connection-mysql/
├── .env.example             # Plantilla de variables de entorno específicas del módulo
├── config/
│   └── database.js          # Configuración del Connection Pool con mysql2/promise
├── database/
│   └── 01-init.sql          # Script DDL (CREATE TABLE) y DML (INSERT iniciales)
├── DTO/
│   ├── usuario.dto.js       # DTO para crear usuarios
│   └── usuario.obtener.dto.js
├── validaciones/
│   └── usuario.crear.validaciones.js # Validaciones del alta de usuarios
├── routes/
│   ├── productos.router.js  # Endpoints de productos
│   └── usuarios.router.js   # Endpoints de usuarios
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

## 👤 Usuarios

La tabla `usuarios` almacena el DPI en `DECIMAL(13, 0)`, además del nombre, correo, teléfono y contraseña. El DPI debe caber en ese rango (hasta 13 dígitos). Como el campo es numérico, los ceros iniciales no se conservan.

Los endpoints están montados bajo el prefijo `/usuarios`:

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/usuarios/:id` | Obtiene un usuario por su ID y devuelve sus datos públicos. | `200 OK`, `404 Not Found` |
| `POST` | `/usuarios` | Crea un usuario. Valida `identificacion`, `nombre` y `email` antes de insertarlo. | `201 Created`, `400 Bad Request` |

Ejemplo de cuerpo para `POST /usuarios`:

```json
{
  "identificacion": "1234567896305",
  "nombre": "Alondra Lucia Martin",
  "email": "alondra.martin@ilark.com",
  "telefono": "53172551",
  "contrasenia": "Alondra_Mailov"
}
```

La identificación puede enviarse como texto numérico, lo que evita perder ceros iniciales antes de llegar al servidor; `express-validator` comprueba que sea un entero. El nombre debe ser texto no vacío y el correo debe tener formato válido.

Cuando falla la validación, la API responde con `400 Bad Request` y un objeto con el mensaje y el detalle de cada error:

```json
{
  "mensaje": "Errores de validación",
  "errores": [
    {
      "type": "field",
      "msg": "Ingrese un correo válido",
      "path": "email",
      "location": "body"
    }
  ]
}
```

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

La colección de pruebas se encuentra en [bruno/module-03/](../../../bruno/module-03):

* **`Get productos.yml`:** Consulta general (`GET http://localhost:3003/productos`).
* **`Find One.yml`:** Consulta de un producto por ID.
* **`Create.yml`:** Registro de un producto.
* **`Update.yml`:** Actualización de un producto.
* **`Crear Usuario.yml`:** Creación de un usuario (`POST http://localhost:3003/usuarios`) con validación de campos.
* **`Find One User.yml`:** Consulta de un usuario por ID (`GET http://localhost:3003/usuarios/:id`).
