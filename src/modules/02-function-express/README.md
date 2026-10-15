# 📦 Módulo 02: Funcionalidades de Express.js (Routers, Middlewares & Headers)

> **Ruta de aprendizaje:** APIs Modulares y Control de Acceso  
> **Tema:** Enrutamiento modular con `express.Router()`, middlewares de inspección de headers y control de permisos en rutas dinámicas.

---

## 🎯 Objetivos de Aprendizaje
* Implementar arquitectura modular separando endpoints en archivos de rutas independientes usando `express.Router()`.
* Utilizar middlewares a nivel de aplicación para registrar y validar cabeceras HTTP (`req.headers`).
* Manejar parámetros dinámicos de ruta mediante `req.params` (ej. `/student/:code`).
* Manejar códigos de estado HTTP correctos según el resultado:
  * `200 OK`: Operación exitosa con datos.
  * `403 Forbidden`: Acceso denegado por falta de permisos o rol inadecuado.
  * `404 Not Found`: Recurso no encontrado en la colección.

---

## 📂 Estructura del Módulo

```text
src/modules/02-function-express/
├── app.js                         # Servidor Express, middlewares y montaje del router
├── routes/
│   └── student.router.js          # Router con endpoints y lógica de estudiantes
└── README.md                      # Documentación del módulo
```

---

## 🔍 Código y Flujo Implementado

### 1. Servidor Principal (`app.js`)
Configura el parseo de JSON, registra el header `role` de cada petición entrante y monta el sub-router en el prefijo `/student`:

```javascript
app.use(express.json());

// Middleware para inspeccionar cabeceras
app.use((req, res, next) => {
    console.log(`Role: ${req.headers.role}`);
    next();
});

// Montaje del router
app.use('/student', stdRouter);
```

### 2. Router de Estudiantes (`routes/student.router.js`)
Gestiona una colección en memoria con las siguientes reglas:

| Método | Endpoint | Cabeceras Requeridas | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/student/` | Ninguna | Obtiene el listado completo de estudiantes (`200 OK`). |
| `GET` | `/student/:code` | `role: admin` | Obtiene un estudiante específico por su código. Si falta el rol devuelve `403 Forbidden`. Si el código no existe devuelve `404 Not Found`. |

---

## 🚀 Cómo Ejecutar Este Módulo

### Opción A: Con Docker (Recomendado)
Desde la raíz del proyecto, con los contenedores activos:

```bash
docker compose exec api npm run module-02
```

O dentro de la terminal interactiva de Docker:
```bash
docker exec -it express_core_api sh
npm run module-02
```

### Opción B: Directamente en tu máquina local
```bash
npm run module-02
```

---

## 🧪 Pruebas con Bruno

La colección de pruebas para este módulo se encuentra en [bruno/module-02/](file:///c:/Users/Henrik/Downloads/Extras/Node.js/express/node-express-core/bruno/module-02):

1. **Obtener todos los estudiantes (`Get All Students.yml`):**
   * **URL:** `GET http://localhost:3000/student/`
   * **Respuesta:** Array con todos los estudiantes registrados (`200 OK`).

2. **Acceso denegado sin rol de administrador (`Get student.yml`):**
   * **URL:** `GET http://localhost:3000/student/E001`
   * **Headers:** Sin header `role`
   * **Respuesta esperada:** `403 Forbidden` $\rightarrow$ `{"error": "Acceso denegado..."}`

3. **Acceso autorizado con rol de administrador (`Get students with role.yml`):**
   * **URL:** `GET http://localhost:3000/student/E001`
   * **Headers:** `role: admin`
   * **Respuesta esperada:** `200 OK` $\rightarrow$ Datos del estudiante `E001`.
