import { Router } from 'express';
import {obtenerProductos,obtenerProducto} from '../controllers/producto.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/productos', obtenerProductos);

// Obtener una categoría por ID
router.get('/producto/:id_producto', obtenerProducto);

export default router;