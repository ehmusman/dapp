import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../../logs/error.log') }),
  ],
});

export default logger;
