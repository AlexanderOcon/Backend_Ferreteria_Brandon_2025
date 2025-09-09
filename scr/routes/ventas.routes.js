import { Router } from 'express';
import {obtenerVentas,obtenerVenta} from '../controllers/ventas.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/ventas', obtenerVentas);
// Obtener una categoría por ID
router.get('/venta/:id_venta', obtenerVenta);

export default router;