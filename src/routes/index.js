import express from 'express';

import entriesRouter from './entriesRouter.js';
import usersRouter from './userRouter.js';

const router = express.Router();

router.use(entriesRouter);

router.use(usersRouter);

export default router;
