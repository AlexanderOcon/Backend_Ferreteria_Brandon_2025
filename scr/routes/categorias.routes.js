import { Router } from 'express';
import {obtenerCategorias} from '../controllers/categorias.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/categorias', obtenerCategorias);

export default router;