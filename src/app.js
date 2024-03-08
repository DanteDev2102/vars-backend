import express, { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

export { app };
