export default class CrearUsuarioDTO{
    #dpi
    #nombre
    #email
    #telefono
    #contrasenia

    constructor(data){
        this.#dpi = data.identificacion;
        this.#nombre = data.nombre;
        this.#email = data.email;
        this.#telefono = data.telefono || null;
        this.#contrasenia = data.contrasenia; 
    }

    set identificacion(dpi){ this.#dpi = dpi }
    set nombre(nombre){ this.#nombre = nombre }
    set email(email){ this.#email = email }
    set telefono(telefono){ this.#telefono = telefono }
    set telefono(contrasenia){ this.#contrasenia = contrasenia }

    get identificacion(){ return this.#dpi }
    get nombre(){ return this.#nombre }
    get email(){ return this.#email }
    get telefono(){ return this.#telefono }
    get contrasenia(){ return this.#contrasenia }
}