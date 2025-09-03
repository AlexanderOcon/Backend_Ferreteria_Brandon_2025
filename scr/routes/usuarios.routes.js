import { Router } from 'express';
import {obtenerUsuario} from '../controllers/usuario.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/usuario', obtenerUsuario);

export default router;