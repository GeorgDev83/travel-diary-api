import express from 'express';
import {
	registerUserController,
	loginUserController,
	getUserProfileController,
	editUserController,
	validateUserController,
	editUserAvatarController,
	sendRecoverPassController,
	editUserPasswordController,
	getOwnUserController,
} from '../controllers/users/index.js';
import userExists from '../middleware/userExists.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

//router.get('/users', (req, res) => {res.send('Estás accediendo a ruta users');})

router.post('/users/register', registerUserController);
router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

/**
 * obtener el perfil publico del usuario
 */
router.get('/users/:userId', getUserProfileController);

/**
 * Obtener el perfil privado del usuario
 */
router.get('/users', authUser, getOwnUserController);

router.put('/users/edit/:userId', authUser, userExists, editUserController);
router.put('/users/avatar', authUser, userExists, editUserAvatarController);

/**
 * Recuperar contraseña
 */
router.post('/users/password/recover', sendRecoverPassController);
router.put('/users/password', editUserPasswordController);

export default router;
