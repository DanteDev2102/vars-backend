import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import mongoose from 'mongoose';

import { serverConfig } from '../../config/server.js';
import { logger } from '../logging/logger.js';

export async function connectDB(tries = 0) {
  const { dbName, dbHost, dbPort } = serverConfig;
  const uri = `${dbHost}:${dbPort}/${dbName}`;
  const dir = `${join(fileURLToPath(import.meta.url), '..')}/entities`;

  try {
    mongoose.createConnection(uri, { maxPoolSize: 10 });
    logger.info('database connection successful');

    const files = await readdir(dir);
    const models = Array.from(await Promise.all(files.map((file) => import(`${dir}/${file}`))));

    models.sort((a, b) => {
      console.log(a.priority);
      if (a.default.priority > b.default.priority) {
        return -1;
      } else if (a.default.priority < b.default.priority) {
        return 1;
      }

      return 0;
    });

    models.forEach(({ default: model }) => {
      mongoose.model(model.name, model.schema, model.name);
      logger.info(`created model ${model.name}`);
    });
  } catch (error) {
    const isMaxTries = tries === 3;

    if (isMaxTries) {
      logger.error('connection to the database has not been possible');
      logger.error(error);
      process.exit(1);
    }

    logger.warn('it will retry connecting to the database');
    logger.warn(error);

    connectDB(tries + 1);
  }
}
