import express from 'express';
import { authUser, userExists } from '../middleware/index.js';
import {
	newEntryController,
	listEntriesController,
} from '../controllers/entries/index.js';

const router = express.Router();

router.post('/entries', authUser, userExists, newEntryController);
router.get('/entries', listEntriesController);

export default router;
