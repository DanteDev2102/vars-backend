import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ 'ok': true });
});

router.post('/signup', (req, res) => {
  res.json({ 'ok': true });
});

export default router;
