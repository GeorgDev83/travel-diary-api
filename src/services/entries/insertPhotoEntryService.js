import getPool from '../../database/getPool.js';

const insertPhotoEntryService = async (photoName, entryId) => {
	const pool = await getPool();

	const [result] = await pool.query(
		`
        INSERT INTO entryphotos (name, entryId)
        VALUES (?, ?)
    `,
		[photoName, entryId]
	);

	const { insertId } = result;

	return insertId;
};

export default insertPhotoEntryService;
