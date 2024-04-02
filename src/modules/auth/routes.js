import { Router } from 'express';
import { signup, signin } from './controllers.js';
import { signupModel, signinModel } from './models.js';
import { validateSchema } from '../../middlewares/validateSchema.js';

const router = Router();

router.post('/signin', validateSchema(signinModel), signin);

router.post('/signup', validateSchema(signupModel), signup);

export default router;
