import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';
import { validateRole } from '../../middlewares/validateRole.js';
import * as controllers from './controllers.js';
import { updateProfileModel, createNoteModel, assignTreatmentModel } from './models.js';

const router = Router();

router.use(validateToken);

router.get('/me', controllers.me);

router.get('/me/patients', validateRole('professional'), controllers.getMyPatients);

router.get('/me/professional', validateRole('patient'), controllers.getMyProfessional);

router.get('/me/addiction', validateRole('patient'), controllers.getMyAddiction);

router.put('/profile', validateSchema(updateProfileModel), controllers.updateProfile);

router.post('/note', validateRole('patient'), validateSchema(createNoteModel), controllers.createNote);

router.post(
  '/asign/treatment',
  validateSchema(assignTreatmentModel),
  validateRole('professional'),
  controllers.assignTreatment
);

router.post('/heal/:patientId', validateRole('professional'), controllers.healPatient);

export default router;
