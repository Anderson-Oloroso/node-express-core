import { body, validationResult } from 'express-validator';

export const uCrearValidaciones = [
    body('identificacion').notEmpty().withMessage('La identificaciòn es obligatoria').isInt().withMessage('La identificación es numérica'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser un texto').trim(),
    body('email').notEmpty().withMessage('El correo electrènico es obligatorio').isEmail().withMessage('Ingrese un correo válido').normalizeEmail(),

];

export function manejadorErroresValidacion(req, res, next){
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        const err = new Error('Errores de validación');
        err.statusCode = 400;
        err.details = errores.array()
        return next(err);
    }
    next();
}
