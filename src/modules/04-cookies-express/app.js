import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cookieSession from 'cookie-session'

const app = express();
app.use(express.urlencoded({ extended: true }));

// El secreto permite crear y verificar cookies firmadas.
app.use(cookieParser('Abc123*'));
app.use(cookieSession({name: 'session', keys: ['Abcd123*']})); // Permite crear cookies por sesion

app.use(express.json());

// Crear una cookie como cliente
app.get('/crear-cookie',  (req, res)=>{
    res.cookie('lang', 'This page is configured as defult language to english');
    res.send('Se creó la coockie MiCookie');
});

// Leo el la cookie almacenada en el navegador (cliente)
app.get('/leer-cookie',(req, res)=>{
    const lang = req.cookies.lang;
    res.send(`Contenido: ${lang}`);
});


// Borrar la cookie mediante el metodo clearCookie (req.lcookie)
app.get('/borrar-cookie/:nombreCookie', (req, res)=>{
    res.clearCookie(req.params.nombreCookie);
    res.send(`Se eliminó la cookie: ${req.params.nombreCookie}`);
});

// Cookie exclusiva para el protocolo seguro HTTPS
app.get('/crear-cookie-segura/:nombreCookie', (req, res)=>{
    const { nombreCookie } = req.params;
    res.cookie('httpsCookie', 'Cookie con HTTPS', { secure: true });
    res.send(`Se creó la cookie: ${nombreCookie}`);
});

// Cookie firmada
app.get('/cookie-firmada/:nombreCookie',(req, res)=>{
    const { nombreCookie } = req.params;
    res.cookie(nombreCookie, ' Cookie firmada', { signed: true});
    res.send(`Se creó la cookie firmada: ${nombreCookie}`);
})

// Verificar la cookie
app.get('/verificar-cookie-firmada/:nombrecookie', (req, res) => {
  const { nombrecookie } = req.params;
  const valorCookieFirmada = req.signedCookies[nombrecookie];

  if (valorCookieFirmada) {
    res.send('Cookie firmada válida');
  } else {
    res.send('Cookie firmada inválida');
  }
});

// Crear cookie temporal
app.get('/crear-cookie-temporal/:nombreCookie', (req, res)=>{
    const { nombreCookie } = req.params;
    res.cookie(nombreCookie, 'Valor de la cookie', { maxAge: 60*1000});
    res.send('Se creó la cookie Mi Cookie');
});


// Crear una cookie de sesion
app.get('/cookie-sesion', (req, res)=>{
    req.session.cookieSession = 'Cookie para una sesion';
    res.send('Cookie de sesion creada');
});

app.listen({
    hostname: process.env.HOST,
    port: process.env.PORT
}, ()=>{
    console.log(`Server running at http://${process.env.HOST === '0.0.0.0' ? 'localhost' : '0.0.0.0' }:${process.env.PORT}/`);})