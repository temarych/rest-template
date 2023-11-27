import { Request, Response }            from 'express';
import { ISignInSchema, ISignUpSchema } from './auth.request';
import { authService }                  from './auth.service';

class AuthController {
  public async signUp(request: Request, response: Response) {
    const data        = request.body as ISignUpSchema;
    const accessToken = await authService.signUp(data);
    
    response.send({ accessToken });
  }

  public async signIn(request: Request, response: Response) {
    const data        = request.body as ISignInSchema;
    const accessToken = await authService.signIn(data);
    
    response.send({ accessToken });
  }
}

export const authController = new AuthController();
