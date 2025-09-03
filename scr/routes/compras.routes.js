import { Router } from 'express';
import {obtenerCompras} from '../controllers/compra.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/compra', obtenerCompras);

export default router;