import 'dotenv/config';

export const serverConfig = {
  serverPort: process.env.PORT_SERVER || 3000,
  serverHost: process.env.HOST_SERVER || 'http://localhost',
  dbHost: process.env.HOST_DB || 'mongodb://localhost',
  dbPort: process.env.PORT_DB || 27017,
  dbName: process.env.NAME_DB || 'vars'
};
