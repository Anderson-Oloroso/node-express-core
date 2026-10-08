// Aplicación simple Cliente-Servidor con Node.js y Express
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const config = {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
};

app.get('/', function(req, res){
    res.send('Hello Camper!');
});

app.listen(config, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}`)
})
