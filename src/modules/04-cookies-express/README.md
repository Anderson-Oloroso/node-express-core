# Módulo 04: Cookies y sesiones con Express

Este módulo muestra cómo Express puede crear, leer, firmar, expirar y eliminar cookies, además de guardar datos en una cookie de sesión.

## Requisitos y ejecución

Instala las dependencias del proyecto y configura `HOST` y `PORT` en el `.env` de la raíz. Desde la raíz del repositorio:

```bash
npm run module-04
```

Con Docker Compose:

```bash
docker compose up -d api
docker compose exec api npm run module-04
```

La aplicación usa `dotenv/config` y escucha en los valores `HOST` y `PORT` configurados en el entorno.

## Endpoints

| Método | Ruta | Comportamiento |
| --- | --- | --- |
| `GET` | `/crear-cookie` | Crea la cookie `lang`. |
| `GET` | `/leer-cookie` | Devuelve el valor de `lang` recibido por el cliente. |
| `GET` | `/borrar-cookie/:nombreCookie` | Solicita al cliente eliminar la cookie indicada. |
| `GET` | `/crear-cookie-segura/:nombreCookie` | Crea la cookie `httpsCookie` con la opción `secure`. El parámetro solo se muestra en el mensaje de respuesta. |
| `GET` | `/cookie-firmada/:nombreCookie` | Crea una cookie firmada con el nombre indicado. |
| `GET` | `/verificar-cookie-firmada/:nombrecookie` | Comprueba si la cookie firmada indicada es válida. |
| `GET` | `/crear-cookie-temporal/:nombreCookie` | Crea una cookie que expira en 60 segundos. |
| `GET` | `/cookie-sesion` | Guarda `cookieSession` en la sesión del cliente. |

Para verificar una cookie firmada, llama primero a `/cookie-firmada/demo` y luego a `/verificar-cookie-firmada/demo`, conservando las cookies entre solicitudes en Bruno.

## Notas importantes

- Una cookie `secure` solo se envía mediante HTTPS. En una prueba local HTTP puede no aparecer en solicitudes posteriores.
- `cookie-session` almacena la sesión en el cliente y la firma; su contenido no está cifrado.
- Los secretos de `cookieParser` y `cookieSession` están escritos directamente en el código y son solo valores de demostración. No deben utilizarse en producción; configura secretos fuertes desde variables de entorno.
- La ruta de creación de cookie segura usa actualmente el nombre fijo `httpsCookie`; el parámetro de la ruta no cambia ese nombre.
