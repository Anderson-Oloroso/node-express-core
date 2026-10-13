import { Router } from 'express';
import pool from '../config/database.js'

const productoRouter = Router()

productoRouter.get('/', async (req, res, next)=>{
    try{
        const [ rows ] = await pool.query('SELECT id, codigo, nombre, descripcion, precio, activo, creado_en FROM productos');
        res.json(rows);
    }
    catch(err){
        next(err);
    }
});


productoRouter.get('/:id', async (req, res, next)=>{
    try{
        const [ rows ] = await pool.execute('SELECT id, codigo, nombre, descripcion, precio, activo, creado_en FROM productos WHERE id = ?', [req.params.id]);
        if(rows.length === 0){
            return res.status(404).json({ error: ' Producto no encontrado ' });
        }
        res.json(rows[0]);
    }
    catch(err){
        next(err);
    }
});

productoRouter.post('/', async (req, res, next)=>{
    try{
        const { codigo, nombre, descripcion, precio } = req.body;
        if(!codigo || !nombre || !precio){
            return res.status(400).json({ error: 'Código, nombre y precio son obligatorios' });
        }
        const [ result ] = await pool.execute('INSERT INTO productos (codigo, nombre, descripcion, precio) VALUES (?,?,?,?)', [codigo, nombre, descripcion || ' ', precio]);
        res.status(201).json({
            id: result.insertId,
            mensaje: 'Producto registrado exitosamente.'
        })
    }
    catch(err){
        next(err);
    }
});

productoRouter.put('/:id', async (req, res, next)=>{
    try{
        const { id } = req.params;
        const { codigo, nombre, descripcion, activo, precio } = req.body;
        let activoValue = null;
        if (activo !== undefined) {
            if (activo === true || activo === 1) {
                activoValue = 1;
            } else if (activo === false || activo === 0) {
                activoValue = 0;
            } else {
                return res.status(400).json({ error: 'El estado activo debe ser true, false, 1 o 0' });
            }
        }

        const [ result ] = await pool.execute(
            'UPDATE productos SET codigo=IFNULL(?, codigo), nombre=IFNULL(?, nombre), descripcion=IFNULL(?, descripcion), activo=IFNULL(?, activo), precio=IFNULL(?, precio) WHERE id = ?',
            [codigo || null, nombre || null, descripcion || null, activoValue, precio ?? null, id]
        );

        if( result.affectedRows === 0){
            return res.status(404).json({ error: ' Producto no encontrado ' });
        }

        res.json({
            affectedRows: result.affectedRows,
            mensaje: 'Producto actualizado correctamente.'
        });
    }
    catch(err){
        next(err);
    }
});

export default productoRouter;