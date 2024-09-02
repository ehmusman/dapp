import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

import { HttpError } from '../utils/HttpError';


const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error details using Winston
  logger.error({
    message,
    status,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Respond to the client
  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
