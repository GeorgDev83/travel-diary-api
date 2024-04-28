import selectAllEntriesService from '../../services/entries/selectAllEntriesService.js';

const listEntriesController = async (req, res, next) => {
	try {
		const entries = await selectAllEntriesService();

		res.send({ status: 'ok', data: { entries } });
	} catch (error) {
		next(error);
	}
};

export default listEntriesController;
