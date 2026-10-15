# 📦 Módulo 01: Introducción a Node.js con Express.js

> **Ruta de aprendizaje:** Fundamentos de Backend  
> **Tema:** Servidor HTTP básico, configuración de variables de entorno y ciclo de vida de peticiones.

---

## 🎯 Objetivos de Aprendizaje
* Comprender el ciclo de vida de una petición HTTP (Request $\rightarrow$ Processing $\rightarrow$ Response).
* Inicializar una instancia de aplicación Express con ESM (`import`).
* Configurar el puerto y host mediante variables de entorno (`process.env.PORT`, `process.env.HOST`) usando `dotenv`.
* Exponer un endpoint raíz con método `GET` y responder al cliente con texto plano (`res.send()`).

---

## 📂 Estructura del Módulo

```text
src/modules/01-intro-node-express/
├── app.js       # Punto de entrada del servidor Express mínimo
└── README.md    # Documentación específica del módulo
```

---

## 🔍 Código Implementado (`app.js`)

El archivo [app.js](file:///c:/Users/Henrik/Downloads/Extras/Node.js/express/node-express-core/src/modules/01-intro-node-express/app.js) crea un servidor web ligero:

1. **Carga de variables de entorno:**
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   ```
2. **Configuración del host y puerto:**
   ```javascript
   const config = {
       port: process.env.PORT || 3000,
       hostname: process.env.HOST || '0.0.0.0'
   };
   ```
3. **Definición de ruta raíz:**
   ```javascript
   app.get('/', (req, res) => {
       res.send('Hello Camper!');
   });
   ```
4. **Inicio de escucha:**
   ```javascript
   app.listen(config, () => {
       console.log(`Server running at http://${config.hostname}:${config.port}`);
   });
   ```

---

## 🚀 Cómo Ejecutar Este Módulo

### Opción A: Con Docker (Recomendado)
Desde la raíz del proyecto, con los contenedores activos (`docker compose up -d`):

```bash
docker compose exec api npm run module-01
```

O bien entrando a la terminal interactiva del contenedor:
```bash
docker exec -it express_core_api sh
npm run module-01
```

### Opción B: Directamente en tu máquina local
```bash
npm run module-01
```

---

## 🧪 Pruebas y Verificación

Realiza una petición `GET` en tu navegador, curl o cliente HTTP:

```bash
curl http://localhost:3000/
```

**Respuesta esperada (HTTP 200):**
```text
Hello Camper!
```
