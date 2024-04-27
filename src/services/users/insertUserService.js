import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import bcrypt from 'bcrypt';
import sendMailUtils from '../../utils/sendMailUtils.js';

const insertUserService = async (email, password) => {
    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT id FROM users WHERE email=?
    `, [email]);
    
    if(user.length) throw generateErrorsUtils('El email ya se encuentra registrado', 509);

    /**
     * logica d eenvío del email
     */
    const registrationCode = "XUBBHNJJJKLLJLK";
    const emailSubject='Activa tu diario de viajes';
    const emailBody=`
        Bienvenid@
        Gracias por registrarte en Diario de Viajes.
        Para activar tu cuenta debes hacer click en el siguiente enlace

        <a href="http://localhost:3001/users/validate/${registrationCode}">Activar cuenta!<a>

        Saludos. Hecho con ♥ (mantener alt + 3 en teclado numérico es el código ASCII) por el equipo de Diario de Viajes.
    `;

    try {
        await sendMailUtils(email, emailSubject, emailBody);
    } catch(error) {
        return;
    }


    const passwordHashed = await bcrypt.hash(password, 10);

    await pool.query(`
        INSERT INTO users (email, password)
        VALUES (?, ?)
    `, [email, passwordHashed]);
}

export default insertUserService;