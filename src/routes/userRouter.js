import express from 'express';
import { registerUserController } from '../controllers/users/index.js';

const router = express.Router();

//router.get('/users', (req, res) => {res.send('Estás accediendo a ruta users');})

router.post('/users/register', registerUserController);

export default router;