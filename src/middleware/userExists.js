import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";


const userExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        const {userId} = req.params;

        const [user] = await pool.query(`
            SELECT id FROM users WHERE id=?
        `, [userId]);

        if(!user.length) {
            throw generateErrorsUtils('Usuario no encontrado!', 401);
        }

        next();
    } catch(error) {
        next(error);
    }
};

export default userExists;