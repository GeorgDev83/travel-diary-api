import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const selectUserByIdService = async (userId) => {
    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT id, email, firstName, lastName, avatar
        FROM users
        WHERE id = ?
    `, [userId]);

    if(user.length == 0) {
        throw generateErrorsUtils('No existe el usuario!', 404)
    }

    return user[0];
}

export default selectUserByIdService;