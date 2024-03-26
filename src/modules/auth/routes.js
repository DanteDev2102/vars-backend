import { Router } from 'express';
import { signup } from './controllers.js';

const router = Router();

router.post('/signin', (req, res) => {
  res.json({ 'ok': true });
});

router.post('/signup', signup);

export default router;
