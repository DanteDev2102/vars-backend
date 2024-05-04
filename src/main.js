import { app } from './app.js';
import { serverConfig } from './config/server.js';
import { connectDB } from './libs/database/connect.js';
import { logger } from './libs/logging/logger.js';
import cron from 'node-cron';
import userCrons from './modules/users/crons.js';

const crons = [...userCrons];

app.listen(serverConfig.serverPort, () => {
  logger.info(`server run in ${serverConfig.serverHost}:${serverConfig.serverPort}`);
  connectDB();
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaugth exception: ${error}`);
  console.log(error);
  process.exit(1);
});

crons.forEach(({ cron: cronFn, time }) => {
  cron.schedule(time, cronFn);
});
