import { Router } from 'express';

const stdRouter = Router();

const students = [
    {code: 'E001', nombre: 'Alondra Martin', ruta: 'NodeJS'},
    {code: 'E002', nombre: 'Jorge Luis', ruta: 'ExpressJS'},
    {code: 'E003', nombre: 'Maria Fernanda', ruta: 'MongoDB'},
];

stdRouter.get('/', (req, res)=>{
    res.status(200).json(students);
});

stdRouter.get('/:code', (req, res) => {
    // Vericar el rol del usuario con headres en bruno
    if(req.headers.role !== 'admin'){
        res.status(403).json({error: 'Acceso denegado. No tiene permisos para acceder a este recurso'});
        return;
    }
    const student = students.find((est)=> est.code === req.params.code);
    if(student){
        res.status(200).json(student);
    }else{
        res.status(404).json({error: `Estudiante con el código ${req.params.code} no encontrado`});
    }
})

export default stdRouter;