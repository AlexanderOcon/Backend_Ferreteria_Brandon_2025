import { Router } from 'express';
import {obtenerDetalles_Ventas} from '../controllers/detalles_ventas.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallesventas', obtenerDetalles_Ventas);

export default router;