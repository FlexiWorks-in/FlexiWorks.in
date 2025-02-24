import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

const validateData =
  (schema: z.ZodObject<any, any>) =>
  (req: Request, res: Response, next: NextFunction): any => {
    console.log('validateData :: req.body: ', req.body);
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'INVALID_DATA',
          message: error.issues[0].message,
          issues: error.issues,
        });
      }
      res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error });
      console.log('validateData ::error: ', error);
    }
  };

export default validateData;
