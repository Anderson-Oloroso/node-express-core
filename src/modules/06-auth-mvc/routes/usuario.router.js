import { Router } from 'express';

import pool from '../helpers/db.js';

import UserModel from '../models/usuario.model.js';
import UsuarioController from '../controllers/usuario.controller.js';

const usuarioModel = new UserModel(pool);
const usuarioController = new UsuarioController(usuarioModel);

const usuarioRouter = Router();

usuarioRouter.get('/', usuarioController.getAll);
usuarioRouter.post('/', usuarioController.create);
usuarioRouter.get('/:id', usuarioController.getById);
usuarioRouter.put('/:id', usuarioController.update);
usuarioRouter.delete('/:id', usuarioController.delete);

export default usuarioRouter;