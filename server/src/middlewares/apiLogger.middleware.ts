import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  res.on('finish', () => {
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const contentLength = res.get('Content-Length') || 0;
    const responseTime = Date.now() - now.getTime();

    logger.http(
      `${method} ${url} ${status} ${contentLength} - ${responseTime} ms`
    );
  });

  next();
};

export default apiLogger;
