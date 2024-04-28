import getPool from '../../database/getPool.js';

const selectAllEntriesService = async () => {
	const pool = await getPool();

	/* SQL sin subconsultas
	
	const [entries] = await pool.query(`
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
		SELECT e.id, e.title, e.place, e.userId, u.email, eph.name, IFNULL(ev.votes,0) as votes
		FROM entries e
		INNER JOIN users u ON u.id = e.userId
		LEFT JOIN (SELECT entryId, AVG(IFNULL(value, 0)) as votes FROM entryvotes GROUP BY entryId) ev ON ev.entryId = e.id
		LEFT JOIN (SELECT id, name, entryId FROM entryphotos) eph ON eph.entryId = e.id
	`);

	let entriesProc = [];
	let hash = {};
	entriesProc = entries
		.map((entry, index, array) => {
			entry.photos = entries
				.filter((element, index, array) => {
					return element.id === entry.id;
				})
				.map((element, index, array) => {
					return element.name;
				});
			delete entry.name;
			return entry;
		})
		.filter((element) =>
			hash[element.id] ? false : (hash[element.id] = true)
		);

	return entriesProc;
};

export default selectAllEntriesService;
