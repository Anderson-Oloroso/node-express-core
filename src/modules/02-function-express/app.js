// Modulo 02 - Aplicacion de funcionalidades de ExpressJS 
import express from 'express';
import dotenv from 'dotenv';
import stdRouter from './routes/student.router.js';

dotenv.config();

const app = express();

// Configuración ejemplificada de middlewares
app.use(express.json());
app.use((req, res, next)=>{
    console.log(`Role: ${req.headers.role}`);
    next();
})

// Rutas de estudiantes
app.use('/student', stdRouter);

app.listen({
    hostname: process.env.HOST,
    port: process.env.PORT
}, ()=>{
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
})
