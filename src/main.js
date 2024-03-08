import { app } from './app.js';
import { serverConfig } from './config/server.js';
import { connectDB } from './libs/database/connect.js';
import { logger } from './libs/logging/logger.js';

app.listen(serverConfig.serverPort, () => {
  logger.info(`server run in ${serverConfig.serverHost}:${serverConfig.serverPort}`);
  connectDB();
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaugth exception: ${error}`);
  process.exit(1);
});
