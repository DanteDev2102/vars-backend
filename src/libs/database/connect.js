import mongoose from 'mongoose';

import { serverConfig } from '../../config/server.js';
import { logger } from '../logging/logger.js';

export async function connectDB(tries = 0) {
  const { dbName, dbHost, dbPort } = serverConfig;
  const uri = `${dbHost}:${dbPort}/${dbName}`;

  try {
    mongoose.connect(uri);
  } catch (error) {
    const isMaxTries = tries === 3;

    if (isMaxTries) {
      process.exit(1);
    }

    logger.warn('it will retry connecting to the database');
    logger.warn(error);

    connectDB(tries + 1);
  }
}

mongoose.connection.on('connected', () => {
  logger.error('database connection successful');
});

mongoose.connection.on('error', (error) => {
  logger.error('connection to the database has not been possible');
  logger.error(error);
});
