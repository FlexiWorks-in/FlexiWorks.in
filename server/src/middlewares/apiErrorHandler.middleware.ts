import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';
import logger from '../logger';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
  // console.log('Req.body: ', req);
  console.log('Error Handler:: Err: ', err);
  logger.error(err);
};
export default errorHandler;
