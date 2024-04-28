import insertEntryService from '../../services/entries/insertEntryService.js';
import insertPhotoEntryService from '../../services/entries/insertPhotoEntryService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { savePhotoUtils } from '../../utils/photoUtils.js';

const newEntryController = async (req, res, next) => {
	try {
		const { title, place, description } = req.body;
		const { id } = req.user;

		if (!title || !place || !description)
			throw generateErrorsUtils('Faltan datos!', 400);

		const entryId = await insertEntryService(title, place, description, id);

		let photos = [];

		if (req.files) {
			for (let photo of Object.values(req.files).slice(0, 3)) {
				let photoName = await savePhotoUtils(photo, 500);
				let photoId = await insertPhotoEntryService(photoName, entryId);

				photos.push({ id: photoId, name: photoName });
			}
		}

		res.send({
			status: 'ok',
			data: {
				entry: {
					id: entryId,
					title,
					place,
					description,
					photos,
					createdAt: new Date(),
				},
			},
		});
	} catch (error) {
		next(error);
	}
};

export default newEntryController;
