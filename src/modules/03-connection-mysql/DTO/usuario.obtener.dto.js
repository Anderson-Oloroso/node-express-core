export default class ObtenerUsuarioDTO{
    #dpi;
    #nombre;
    #email;
    #telefono;
    #activo;
    #creado_en

    constructor(data){
        this.#dpi = data.identificacion;
        this.#nombre = data.nombre;
        this.#email = data.email;
        this.#telefono = data.telefono || null;
        this.#activo = data.activo;
        this.#creado_en = data.creado_en
    }

    set identificacion(dpi){ this.#dpi = dpi }
    set nombre(nombre){ this.#nombre = nombre }
    set email(email){ this.#email = email }
    set telefono(telefono){ this.#telefono = telefono }
    set telefono(activo){ this.#activo = activo }
    set creado_en(creado_en){ this.#creado_en = creado_en }

    get identificacion(){ return this.#dpi }
    get nombre(){ return this.#nombre }
    get email(){ return this.#email }
    get telefono(){ return this.#telefono }
    get activo(){ return this.#activo === 0 ? false : true }
    get creado_en(){ return this.#creado_en }

    get data() {
        return {
            dpi: this.#dpi,
            nombre: this.#nombre,
            email: this.#email,
            telefono: this.#telefono,
            activo: this.#activo,
            creado_en: this.#creado_en
        };
    }
}