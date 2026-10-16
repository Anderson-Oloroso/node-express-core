import { Router } from 'express';
import pool from '../config/database.js'
import CrearUsuarioDTO from '../DTO/usuario.dto.js';
import ObtenerUsuarioDTO from '../DTO/usuario.obtener.dto.js';

import {uCrearValidaciones, manejadorErroresValidacion} from '../validaciones/usuario.crear.validaciones.js';

const usuariosRouter = Router()

usuariosRouter.get('/:id', async (req, res, next)=>{
    try{
        const [ rows ] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        if(rows.length === 0){
            return res.status(404).json({ error: ' Usuario no encontrado ' });
        }

        const usuario = new ObtenerUsuarioDTO(rows[0])
        res.json(usuario.data);
    }
    catch(err){
        next(err);
    }
});

usuariosRouter.post('/login', uCrearValidaciones, manejadorErroresValidacion, async (req, res, next)=>{
    try{
        const { email, contrasenia } = req.body;
        const [ rows ] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if(rows.length===0){
            return res.status(401).json({ error: 'Usuario no encontrado o contraseña inválida'});
        }else{
            const usuario = rows[0];
            if(usuario.contrasenia === contrasenia){
                const usuario = new ObtenerUsuarioDTO(rows[0]);
                res.json(usuario.data)
            }
            else{
                return res.status(401).json({ error: 'Usuario no encontrado o contraseña inválida'});
            }
        }
    }catch(err){
        next(err)
    }
});

usuariosRouter.post('/', uCrearValidaciones, manejadorErroresValidacion,async (req, res, next)=>{
    try{
        const usuario = new CrearUsuarioDTO(req.body);
        const [ result ] = await pool.execute(
            `INSERT INTO usuarios (dpi, nombre, email, telefono, contrasenia)
            VALUES
                (?, ?, ?, ?, ?)`,
            [ usuario.identificacion, usuario.nombre, usuario.email, usuario.telefono, usuario.contrasenia]
        );

        res.status(201).json({
            id: result.insertId,
            mensaje: "Usuario creado exitosamente"
        });
    }catch(err){
        next(err)
    }
});


export default usuariosRouter;