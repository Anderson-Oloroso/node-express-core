// Aplicación simple Cliente-Servidor con Node.js y Express
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const config = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME
};

app.get('/', function(req, res){
    res.send('Hello Camper!');
});

app.listen(config, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}`)
})
