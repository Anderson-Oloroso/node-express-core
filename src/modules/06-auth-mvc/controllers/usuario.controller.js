export default class UsuarioController{
    #usuarioModel;

    constructor(model){
        this.#usuarioModel = model;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    async getAll( req, res, next ){
        try{
            const usuarios = await this.#usuarioModel.list();
            res.json(usuarios);
        }catch(err){
            next(err);
        }
    }

    async getById( req, res, next ){
        try{
            const { id } = req.params;
            const usuario = await this.#usuarioModel.findOne(id);
            if(!usuario){
                return res.status(404).json({
                    mensaje: 'Usuario no encontrado.'
                });
            }

            res.json(usuario);
        }catch(err){
            next(err);
        }
    }

    async create( req, res, next ){
        try{
            const { dpi, nombre, email, telefono = null, contrasenia } = req.body;
            if(!dpi || !nombre || !email || !contrasenia){
                return res.status(400).json({
                    mensaje: 'dpi, nombre, email y contrasenia son obligatorios.'
                });
            }

            const id = await this.#usuarioModel.create({
                dpi,
                nombre,
                email,
                telefono,
                contrasenia
            });

            res.status(201).json({
                id,
                mensaje: 'Usuario creado correctamente.'
            });
        }catch(err){
            next(err);
        }
    }

    async delete( req, res, next ){
        try{
            const { id } = req.params;
            const affectedRows = await this.#usuarioModel.delete(id);
            if(affectedRows === 0){
                return res.status(404).json({
                    mensaje: 'Usuario no encontrado.'
                });
            }

            res.json({
                mensaje: 'Usuario eliminado correctamente.'
            });
        }catch(err){
            next(err);
        }
    }

    async update( req, res, next ){
        try{
            const id = Number(req.params.id);
            if(!Number.isInteger(id) || id <= 0){
                return res.status(400).json({
                    mensaje: 'El id debe ser un entero positivo.'
                });
            }

            const { dpi, nombre, email, telefono, contrasenia, activo } = req.body;
            if(
                dpi === undefined ||
                !nombre ||
                !email ||
                contrasenia === undefined ||
                (activo !== 0 && activo !== 1 && activo !== '0' && activo !== '1') ||
                telefono === undefined
            ){
                return res.status(400).json({
                    mensaje: 'dpi, nombre, email, telefono, contrasenia y activo son obligatorios.'
                });
            }

            const usuarioActualizado = {
                id,
                dpi,
                nombre,
                email,
                telefono,
                contrasenia,
                activo: Number(activo)
            };
            const affectedRows = await this.#usuarioModel.update(usuarioActualizado);

            if(affectedRows === 0 && !(await this.#usuarioModel.findOne(id))){
                return res.status(404).json({
                    mensaje: 'Usuario no encontrado.'
                });
            }

            res.json({mensaje: 'Usuario actualizado correctamente.'});
        }catch(err){
            next(err);
        }
    }
}