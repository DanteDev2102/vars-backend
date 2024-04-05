import { Router } from 'express';
// import { signup, signin } from './controllers.js';
// import { signupModel, signinModel } from './models.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateSchema } from '../../middlewares/validateSchema.js';

const router = Router();

router.get('/', signup);

router.post('/', validateToken, validateSchema(signinModel), signin);

router.put('/', validateToken, validateSchema(signupModel), signup);

export default router;
