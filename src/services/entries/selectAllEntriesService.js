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
		SELECT e.id, e.title, e.place, e.userId, u.email, eph.name, ev.votes
		FROM entries e
		INNER JOIN users u ON u.id = e.userId
		LEFT JOIN (SELECT entryId, AVG(IFNULL(value, 0)) as votes FROM entryvotes GROUP BY entryId) ev ON ev.entryId = e.id
		LEFT JOIN (SELECT id, name, entryId FROM entryphotos) eph ON eph.entryId = e.id;
	`);

	let entriesProc = new Array();

	entries.forEach((element) => {
		let filterEntries = entries.filter((el) => {
			return el.id === element.id;
		});
		let photos = new Array();
		filterEntries.forEach((el) => {
			photos.push(el.name);
		});
		let entry = { ...element };
		delete entry.name;
		entry.photos = photos;
		entriesProc.push(entry);
	});

	let hash = {};
	entriesProc = entriesProc.filter((o) =>
		hash[o.id] ? false : (hash[o.id] = true)
	);

	return entriesProc;
};

export default selectAllEntriesService;
