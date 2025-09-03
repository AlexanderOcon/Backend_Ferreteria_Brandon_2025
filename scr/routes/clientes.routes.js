import { Router } from 'express';
import {obtenerClientes} from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/cliente', obtenerClientes);

export default router;