# Módulo 06: CRUD de usuarios con MVC y MySQL

Este módulo organiza una API Express en rutas, controlador y modelo para realizar operaciones CRUD sobre usuarios. La persistencia usa MySQL y `mysql2/promise`.

## Estructura

```text
src/modules/06-auth-mvc/
├── .env.example
├── app.js
├── controllers/
│   └── usuario.controller.js
├── database/
│   └── 01-init.sql
├── helpers/
│   └── db.js
├── models/
│   └── usuario.model.js
├── routes/
│   └── usuario.router.js
└── README.md
```

Las rutas delegan al controlador, y el controlador utiliza el modelo para consultar y modificar la tabla `usuarios`.

## Configurar la base de datos

El script `database/01-init.sql` crea la base `campus`, las tablas `productos` y `usuarios`, cuatro productos tecnológicos y tres usuarios de demostración. Las semillas usan `ON DUPLICATE KEY UPDATE`, por lo que se pueden volver a ejecutar para actualizar los registros de ejemplo.

Con Docker Compose, inicia MySQL y aplica el script desde la raíz del repositorio:

```bash
docker compose up -d mysql
docker compose exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql --default-character-set=utf8mb4 -uroot' < src/modules/06-auth-mvc/database/01-init.sql
```

## Configuración y ejecución

Crea el `.env` local del módulo a partir de la plantilla:

```bash
cp src/modules/06-auth-mvc/.env.example src/modules/06-auth-mvc/.env
```

La plantilla está preparada para Docker Compose (`DB_HOST=mysql`, `DB_PORT=3306`, `HOST=0.0.0.0`). Si ejecutas Node fuera de Docker, cambia `DB_HOST` a `127.0.0.1` y `DB_PORT` al puerto externo de MySQL configurado en el `.env` raíz (por defecto, `3307`).

Inicia la infraestructura y la API:

```bash
docker compose up -d api mysql
docker compose exec api npm run module-06
```

El contenedor de API permanece en espera al iniciarse; por eso el segundo comando ejecuta el servidor. La API escucha en el puerto `3003`. También puedes ejecutarla en el host con `npm run module-06` después de configurar Node y la conexión local a MySQL.

## API de usuarios

Todas las rutas usan el prefijo `/usuario`.

| Método | Ruta | Comportamiento | Respuestas principales |
| --- | --- | --- | --- |
| `GET` | `/usuario` | Lista usuarios sin exponer el campo `contrasenia`. | `200` |
| `GET` | `/usuario/:id` | Obtiene un usuario por ID, sin exponer la contraseña. | `200`, `404` |
| `POST` | `/usuario` | Crea un usuario. `dpi`, `nombre`, `email` y `contrasenia` son obligatorios; `telefono` es opcional. | `201`, `400` |
| `PUT` | `/usuario/:id` | Actualiza todos los campos editables. Debe enviarse el objeto completo. | `200`, `400`, `404` |
| `DELETE` | `/usuario/:id` | Elimina permanentemente al usuario. | `200`, `404` |

### Crear usuario

```http
POST http://localhost:3003/usuario
Content-Type: application/json
```

```json
{
  "dpi": "1000000000004",
  "nombre": "Usuario de prueba",
  "email": "usuario@example.com",
  "telefono": "5550-0004",
  "contrasenia": "demo-usuario-004"
}
```

### Actualizar usuario

`id` se proporciona en la ruta y no se modifica. `creado_en` también queda fuera de la actualización porque lo genera la base de datos. El cuerpo debe incluir `dpi`, `nombre`, `email`, `telefono`, `contrasenia` y `activo` (`0` o `1`).

```http
PUT http://localhost:3003/usuario/1
Content-Type: application/json
```

```json
{
  "dpi": "1000000000001",
  "nombre": "Ana Ejemplo Actualizada",
  "email": "ana.actualizada@example.com",
  "telefono": "5550-0010",
  "contrasenia": "demo-ana-actualizada",
  "activo": 1
}
```

### Eliminar usuario

```http
DELETE http://localhost:3003/usuario/1
```

Las peticiones de Bruno están en [`bruno/module-06`](../../../bruno/module-06). En las solicitudes de actualización y eliminación, cambia el ID de ejemplo por uno existente.

## Seguridad de los datos de demostración

El esquema de práctica almacena `contrasenia` en texto plano y limita la columna a 30 caracteres. Los valores del SQL son ficticios y solo para aprendizaje; esta implementación no debe usarse para usuarios reales. En una aplicación real se debe almacenar un hash de contraseña, no la contraseña original.
