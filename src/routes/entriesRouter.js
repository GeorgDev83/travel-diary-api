import express from 'express';

const router = express.Router();

router.get('/entries', (req, res) => {res.send('Estás accediendo a ruta entries');})

export default router;