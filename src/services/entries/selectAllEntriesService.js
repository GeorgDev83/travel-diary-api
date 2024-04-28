import getPool from '../../database/getPool.js';

const selectAllEntriesService = async () => {
	const pool = await getPool();

	/*const [entries] = await pool.query(`
		SELECT e.id, e.title, e.place, e.userId, u.email, AVG(IFNULL(v.value, 0)) as votes, e.createdAt
		FROM entries e
		LEFT JOIN entryvotes v ON v.entryId = e.id
		INNER JOIN users u ON u.id = e.userId
		GROUP BY e.id
		ORDER BY e.createdAt
	`);

	for (let entry of entries) {
		const [photos] = await pool.query(
			`
				SELECT id, name FROM entryphotos WHERE entryId = ?
			`,
			[entry.id]
		);
		entry[photos] = photos;
	}*/

	const [entries] = await pool.query(`
		SELECT e.id, e.title, e.place, e.userId, u.email, eph.name, ev.votes
		FROM entries e
		INNER JOIN users u ON u.id = e.userId
		LEFT JOIN (SELECT entryId, AVG(IFNULL(value, 0)) as votes FROM entryvotes GROUP BY entryId) ev ON ev.entryId = e.id
		LEFT JOIN (SELECT id, name, entryId FROM entryphotos) eph ON eph.entryId = e.id;
	`);

	const entriesProc = entries.reduce((acumulator, item, index, array) => {
		let { id, title, place, userId, email, name, votes } = item;
		let photos = new Array();
		photos.push(name);

		return {
			id,
			title,
			place,
			userId,
			email,
			photos,
			votes,
			photos,
		};
	}, 0);

	return entriesProc;
};

export default selectAllEntriesService;
