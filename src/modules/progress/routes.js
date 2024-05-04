import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { validateRole } from '../../middlewares/validateRole.js';
import { create, promByIntervalDate } from './controllers.js';
import { createProgressModel, promProgressModel } from './models.js';

const router = Router();

router.use(validateToken);

router.post('/average', validateSchema(promProgressModel), promByIntervalDate);

router.post('/', validateRole('professional'), validateSchema(createProgressModel), create);

export default router;
