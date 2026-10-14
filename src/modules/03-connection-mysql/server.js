import express from 'express';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
    path: fileURLToPath(new URL('./.env', import.meta.url)),
    override: true
});

const { default: productoRouter } = await import('./routes/productos.router.js');
const { default: usuariosRouter } = await import('./routes/usuarios.router.js');


const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/productos', productoRouter);
server.use('/usuarios', usuariosRouter);

// 1. Ruta no existente
server.use((req, res)=>{
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// 2. Manejo de error global
server.use((err ,req, res)=>{
    console.log('Error Interno: ', err.message);
    res.status(404).json({ error: 'Error interno del servidor' });
});

server.listen( PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));
