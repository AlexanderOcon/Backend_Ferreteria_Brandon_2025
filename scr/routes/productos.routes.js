import { Router } from 'express';
import {obtenerProductos} from '../controllers/producto.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

export default router;