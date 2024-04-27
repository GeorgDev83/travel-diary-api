import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import selectUserByEMailService from './selectUserByEmailService.js';

import bcrypt from 'bcrypt';

const updateUserPassService = async (email, recoverPassCode, newPassword) => {
	const pool = await getPool();

	const user = await selectUserByEMailService(email);

	if (!user || user.recoverPassCode !== recoverPassCode) {
		throw generateErrorsUtils(
			'Email o código de recuperación no válidos!',
			409
		);
	}

	const hashPassword = await bcrypt.hash(newPassword, 10);

	await pool.query(
		`
        UPDATE users
        SET password = ?, recoverPassCode = null 
        WHERE recoverPassCode = ?
    `,
		[hashPassword, recoverPassCode]
	);
};

export default updateUserPassService;
