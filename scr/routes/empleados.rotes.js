import { Router } from 'express';
import {obtenerEmpleados,obtenerempleado} from '../controllers/empleado.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/empleados', obtenerEmpleados);

// Obtener un empleado por ID
router.get('/empleado/:id_empleado', obtenerempleado);

export default router;