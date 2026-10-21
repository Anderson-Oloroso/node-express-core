import express from 'express';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
    path: fileURLToPath(new URL('./.env', import.meta.url)),
    override: true
});

const { default: usuarioRouter } = await import('./routes/usuario.router.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true }));

app.use('/usuario', usuarioRouter);

app.use(errorHandler);

function errorHandler(err, req, res, next){
    res.status(err.statusCode || 500).json({
        message: err.message || 'Error interno del servidor'
    });
}

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`App is running at http://${process.env.HOST}:${process.env.PORT}`);
    console.log(`Conectado a la base de datos ${process.env.DB_NAME}`);
});