import { NextFunction, Request, Response } from 'express';
import { HttpError }                       from '@utils/error';

export const handleError = (error: Error, _: Request, response: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    return response.status(error.code).send({
      type   : error.type,
      message: error.message
    });
  }

  console.error(error);

  response.status(500).send({
    type   : 'internal',
    message: 'Internal server error',
  });

  return next();
};
