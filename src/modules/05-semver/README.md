# Módulo 05: Compatibilidad de versiones con SemVer

Este módulo expone un endpoint que compara la versión enviada por un cliente con la versión actual de la aplicación, utilizando el paquete `semver`.

## Requisitos y ejecución

Configura `PORT` en el `.env` de la raíz del proyecto. Desde la raíz:

```bash
npm run module-05
```

Con Docker Compose:

```bash
docker compose up -d api
docker compose exec api npm run module-05
```

El servidor escucha en `process.env.PORT`.

## Endpoints

| Método | Ruta | Comportamiento |
| --- | --- | --- |
| `GET` | `/` | Devuelve un mensaje de bienvenida. |
| `GET` | `/version?v=<versión>` | Comprueba si la versión proporcionada es compatible con la versión actual `1.0.0`. |

Ejemplos con el servidor en el puerto `3000`:

```text
GET http://localhost:3000/
GET http://localhost:3000/version?v=1.2.0
GET http://localhost:3000/version?v=0.9.0
```

El endpoint `/version` compara con el rango `>= 1.0.0`. Si falta el parámetro `v`, responde `400` con un error. Una versión que satisface el rango responde `200`; una versión inferior responde `400`.

## Ejemplos de respuesta

Versión compatible:

```json
{
  "Mensaje": "La version 1.0.0 es compatible con la versióm de la aplicación."
}
```

Falta el parámetro:

```json
{
  "error": "Se necesita proporcionar el número de versión"
}
```

La aplicación usa `semver.satisfies`, por lo que el valor de `v` debe ser una versión SemVer válida, por ejemplo `1.2.0`.
