import * as winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';
const silentTestLogs = !!process.env.TEST_LOGS;

const log = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  silent: isTesting && !silentTestLogs,
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});

export default log;
