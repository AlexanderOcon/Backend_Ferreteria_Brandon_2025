import { Router } from 'express';
import {obtenerEmpleados,obtenerempleado, registrarEmpelado} from '../controllers/empleado.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/empleados', obtenerEmpleados);

// Obtener un empleado por ID
router.get('/empleado/:id_empleado', obtenerempleado);

router.post('/registrarempleado', registrarEmpelado);

export default router;