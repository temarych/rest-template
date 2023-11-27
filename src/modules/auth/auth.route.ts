import { Router }                     from 'express';
import { validate }                   from '@middleware/validation.middleware';
import { authController }             from './auth.controller';
import { signInSchema, signUpSchema } from './auth.request';

export const authRoute = Router();

authRoute.post('/signup', validate(signUpSchema), authController.signUp);
authRoute.post('/signin', validate(signInSchema), authController.signIn);
