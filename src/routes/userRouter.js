import express from 'express';
import { registerUserController, loginUserController, getUserProfileController, editUserController } from '../controllers/users/index.js';
import userExists from '../middleware/userExists.js';

const router = express.Router();

//router.get('/users', (req, res) => {res.send('Estás accediendo a ruta users');})

router.post('/users/register', registerUserController);
router.post('/users/login', loginUserController);

/**
 * obtener el perfil publico dle usuario
 */
router.get('/users/:userId', getUserProfileController);

router.put('/users/edit/:userId', userExists, editUserController);

export default router;