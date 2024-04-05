import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { validateRole } from '../../middlewares/validateRole.js';
import {
  me,
  updateProfile,
  getMyProfessional,
  getMyPatients,
  getProfessionals,
  getMyAddiction
} from './controllers.js';
import { updateProfileModel } from './models.js';

const router = Router();

router.use(validateToken);

router.get('/me', me);

router.get('/me/patients', validateRole('professional'), getMyPatients);

router.get('/me/professional', validateRole('patient'), getMyProfessional);

router.get('/me/addiction', validateRole('patient'), getMyAddiction);

router.put('/profile', validateSchema(updateProfileModel), updateProfile);

export default router;
