import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import bcrypt from 'bcrypt';

const insertUserService = async (email, password) => {
    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT id FROM users WHERE email=?
    `, [email]);
    
    if(user.length) throw generateErrorsUtils('El email ya se encuentra registrado', 509);

    const passwordHashed = await bcrypt.hash(password, 10);

    await pool.query(`
        INSERT INTO users (email, password)
        VALUES (?, ?)
    `, [email, passwordHashed]);
}

export default insertUserService;