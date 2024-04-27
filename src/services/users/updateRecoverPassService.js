import getPool from '../../database/getPool.js';
import sendMailUtils from '../../utils/sendMailUtils.js';

const updateRecoverPassService = async (email, recoverPassCode) => {
	const pool = await getPool();

	await pool.query(
		`
        UPDATE users
        SET recoverPassCode = ?
        WHERE email = ?
    `,
		[recoverPassCode, email]
	);

	const subject = 'Recuperación de contraseña de Diario de Viajes';

	const body = `
        Se ha solicitado la recuperación de la contraseña de Diario de Viajes para este email.
        Utiliza el siguiente código de recuperación para crear una nueva contraseña ${recoverPassCode}
        
        Si no ha sido usted, desestime este correo.

        Saludos. Hecho con ♥ (mantener alt + 3 en teclado numérico es el código ASCII) por el equipo de Diario de Viajes.
    `;

	await sendMailUtils(email, subject, body);
};

export default updateRecoverPassService;
