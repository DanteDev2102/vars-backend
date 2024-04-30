import { Router } from 'express';
import { create, getAll, getById } from './controllers.js';
import { createAddictionModel } from './models.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { validateRole } from '../../middlewares/validateRole.js';

const router = Router();

router.post('/', validateToken, validateSchema(createAddictionModel), create);

router.get('/', getAll);

router.get('/:id', validateToken, validateRole('admin'), getById);

export default router;
