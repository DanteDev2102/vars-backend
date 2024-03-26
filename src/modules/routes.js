import fs from 'node:fs';
import path from 'node:path';

import { Router } from 'express';

const routes = Router();

const dir = path.join(process.cwd(), '/src/modules');

const subDirs = fs.readdirSync(dir);

subDirs.forEach(async (dir) => {
  if (dir === 'routes.js') return;

  const router = await import(`./${dir}/routes.js`);

  routes.use(`/${dir}`, router.default);
});

routes.use('/ok', (_, res) => {
  res.json({ ok: true });
});

export default routes;
