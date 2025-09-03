import { Router } from 'express';
import {obtenerEmpleado} from '../controllers/empleado.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/empleado', obtenerEmpleado);

export default router;