// Modulo 02 - Aplicacion de funcionalidades de ExpressJS 
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuración ejemplificada de middlewares
app.use(express.json());
app.use((req, res, next)=>{
    console.log(`Role: ${req.headers.role}`);
    next();
})

const students = [
    {code: 'E001', nombre: 'Alondra Martin', ruta: 'NodeJS'},
    {code: 'E002', nombre: 'Jorge Luis', ruta: 'ExpressJS'},
    {code: 'E003', nombre: 'Maria Fernanda', ruta: 'MongoDB'},
]
// Peticion GET para obtener todos los estudiantes
app.get('/student/:code', (req, res) => {
    // Vericar el rol del usuario con headres en bruno
    if(req.headers.role !== 'admin'){
        res.status(403).json({error: 'Acceso denegado. No tiene permisos para acceder a este recurso'});
        return;
    }
    const student = students.find((est)=> est.code === req.params.code);
    if(student){
        res.status(200).json(student);
    }else{
        res.status(404).json({error: `Estudiante con el código ${req.params.code} no encontrado`});
    }
})

app.listen({
    hostname: process.env.HOST,
    port: process.env.PORT
}, ()=>{
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
})
