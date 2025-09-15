import { Router } from 'express';
import {obtenerUsuarios, obtenerUsuario, registrarUsuarios} from '../controllers/usuario.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/usuarios', obtenerUsuarios);

// Obtener un usuario por ID
router.get('/usuario/:id_usuario', obtenerUsuario);


router.post('/registrarusuario', registrarUsuarios);
export default router;