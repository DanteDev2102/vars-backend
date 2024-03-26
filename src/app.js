import { createRequire } from 'node:module';
import express, { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const require = createRequire(import.meta.url);
const { helper } = require('express-response-helper');

import routes from './modules/routes.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(helper());
app.use('/api/v1', routes);

export { app };
