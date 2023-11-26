import { NextFunction, Request, Response } from 'express';
import { Schema, ZodError }                from 'zod';

export const getErrors = (zodError: ZodError) => {
  return zodError.errors.map((error) => ({
    field  : error.path.join('.'),
    message: error.message
  }));
};

export const validate = (schema: Schema) => (request: Request, response: Response, next: NextFunction) => {
  const result = schema.safeParse(request.body);

  if (result.success) return next();

  return response.status(400).send({
    code  : 'invalid-request-body',
    errors: getErrors(result.error)
  });
};
