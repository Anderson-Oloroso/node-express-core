import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos MongoDB
await connectDB();

// Endpoint raíz (Health Check)
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        project: 'express-core',
        message: '🚀 Servidor Express + MongoDB con Docker corriendo perfectamente',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Endpoint de estado del sistema
app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'UP',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});

export default app;
