import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';
import User from '../models/user.model';
import config from '../config';
import logger from '../logger';

const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization?.split(' ')[1] ?? req.cookies.accessToken;

    if (!token) {
      throw new ApiError(401, 'Authentication token required');
    }
    const { _id } = jwt.verify(token, config.accessTokenSecret) as {
      _id: string;
    };
    req.user = await User.findOne({ _id }).select('_id');

    next();
  } catch (error: any) {
    logger.error('authRequired :: error: ', error);
    next(error);
  }
};

export default authRequired;
