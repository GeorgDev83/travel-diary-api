import getPool from "../../database/getPool.js"

const updateUserService = async (userId, firstName, lastName) => {
    const pool = await getPool();

    await pool.query(`
        UPDATE users
        SET firstName = ?, lastName = ?
        where id = ?
    `, [firstName, lastName, userId]);
}

export default updateUserService;