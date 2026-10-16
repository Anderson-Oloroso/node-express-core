import express from 'express';
import semver from 'semver';
import 'dotenv/config';


const app = express();
app.get('/', (req, res)=>{
    res.send('Welcome o my Application');
});


app.get('/version', (req, res)=>{
    const { v: clientVersion} = req.query;
    const appVersion = '1.0.0';

    if(!clientVersion){
        return res.status(400).json({
            error: 'Se necesita proporcionar el número de versión'
        });
    }

    if(semver.satisfies(clientVersion, `>= ${appVersion}`)){
        return res.status(200).json({
            Mensaje: `La version ${appVersion} es compatible con la versióm de la aplicación.`
        });
    }else{
        return res.status(400).json({
            Mensaje: `La versión ${clientVersion} es incompatible con la versión actual..`
        });
    }
});
app.listen(process.env.PORT, ()=> console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));