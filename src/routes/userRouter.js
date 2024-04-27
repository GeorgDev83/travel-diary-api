import express from 'express';
import { registerUserController, loginUserController, getUserProfileController, editUserController, validateUseController, editUserAvatarController } from '../controllers/users/index.js';
import userExists from '../middleware/userExists.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

//router.get('/users', (req, res) => {res.send('Estás accediendo a ruta users');})

router.post('/users/register', registerUserController);
router.get('/users/validate/:registrationCode', validateUseController);

router.post('/users/login', loginUserController);

/**
 * obtener el perfil publico dle usuario
 */
router.get('/users/:userId', getUserProfileController);

router.put('/users/edit/:userId', authUser, userExists, editUserController);
router.put('/users/avatar', authUser, userExists, editUserAvatarController);


/**
 * Recuperar contraseña
 */


export default router;