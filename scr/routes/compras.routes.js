import { Router } from 'express';
import {obtenerCompras,obtenerCompra, registrarCompra} from '../controllers/compra.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/compras', obtenerCompras);

// Obtener una categoría por ID
router.get('/compra/:id_compra', obtenerCompra);

// Registrar una nueva categoría
router.post('/registrarcompra', registrarCompra);

export default router;