import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { me, updateProfile } from './controllers.js';
import { updateProfileModel } from './models.js';

const router = Router();

router.use(validateToken);

router.get('/me', me);

router.put('/profile', validateSchema(updateProfileModel), updateProfile);

export default router;
