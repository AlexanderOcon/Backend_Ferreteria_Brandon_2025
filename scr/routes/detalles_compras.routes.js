import { Router } from 'express';
import {obtenerDetalles_Compra} from '../controllers/detalles_compras.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/detallescompras', obtenerDetalles_Compra);

export default router;