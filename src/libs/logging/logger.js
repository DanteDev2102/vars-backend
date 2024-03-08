import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ timestamp: true }),
    new winston.transports.File({ filename: 'logs.txt' })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `[${info.level}] ${info.timestamp} ${info.message}`)
  )
});
