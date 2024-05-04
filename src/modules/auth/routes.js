import { Router } from 'express';
import { signup, signin, questions } from './controllers.js';
import { signupModel, signinModel } from './models.js';
import { validateSchema } from '../../middlewares/validateSchema.js';

const router = Router();

router.post('/signin', validateSchema(signinModel), signin);

router.post('/signup', validateSchema(signupModel), signup);

router.get('/questions', questions);

export default router;
