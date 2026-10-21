export default class User{
    #db;

    constructor(db){
        this.#db = db;
    }

    async list(){
        const [ rows ] = await this.#db.query(
            'SELECT id, dpi, nombre, email, telefono, activo, creado_en FROM usuarios'
        );
        return rows;
    }

    async findOne(id){
        const [ rows ] = await this.#db.query(
            'SELECT id, dpi, nombre, email, telefono, activo, creado_en FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0] ?? null;
    }

    async create(user){
        const [ result ] = await this.#db.execute(
            'INSERT INTO usuarios (dpi, nombre, email, telefono, contrasenia) VALUES (?, ?, ?, ?, ?)',
            [user.dpi, user.nombre, user.email, user.telefono, user.contrasenia]
        );
        return result.insertId;
    }

    async update(user){
        const [ result ] = await this.#db.execute(
            'UPDATE usuarios SET dpi = ?, nombre = ?, email = ?, telefono = ?, contrasenia = ?, activo = ? WHERE id = ?',
            [user.dpi, user.nombre, user.email, user.telefono, user.contrasenia, user.activo, user.id]
        );
        return result.affectedRows;
    }

    async delete(id){
        const [ result ] = await this.#db.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}