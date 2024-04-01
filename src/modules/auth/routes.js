import { Router } from 'express';
import { signup } from './controllers.js';
import { signupModel } from './models.js';
import { validateSchema } from '../../middlewares/validateSchema.js';

const router = Router();

router.post('/signin', (req, res) => {
  res.json({ 'ok': true });
});

router.post('/signup', validateSchema(signupModel), signup);

export default router;
