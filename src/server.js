import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import routes from './routes/index.js';

/**
 * server es una instancia de express
 */
const server = express();

/**
 * Middleware es una porción de código que se ejecuta en medio.
 * Aplicamos el middleware de aplicación morgan.
 */
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(fileUpload());

/**
 * Definir una ruta estática
 */
server.use('/uploads', express.static(process.env.UPLOAD_DIR));

/**
 * Llamado a rutas
 */
server.use(routes);

/**
 * Middleware de manejo de errores
 */
server.use((error, req, res, next) => {
	res.status(error.httpStatus || 500).send({
		status: 'error',
		message: error.message,
	});
});

/**
 * Middleware de ruta no encontrada
 */
server.use((req, res) => {
	res.status(404).send({ status: 'error', message: 'Not found' });
});

export default server;
