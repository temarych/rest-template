import { Request, Response }              from 'express';
import { userService }                    from '@services/user.service';
import { comparePasswords, hashPassword } from '@utils/password';
import { createAccessToken }              from '@utils/token';
import { ISignInSchema, ISignUpSchema }   from './auth.request';

class AuthController {
  public async signUp(request: Request, response: Response) {
    const data          = request.body as ISignUpSchema;
    const isEmailUnique = await userService.isEmailUnique(data.email);

    if (!isEmailUnique) {
      return response.status(400).send({
        code   : 'email-not-unique',
        message: 'Email not unique'
      });
    }

    const isUsernameUnique = await userService.isUsernameUnique(data.username);

    if (!isUsernameUnique) {
      return response.status(400).send({
        code   : 'username-not-unique',
        message: 'Username not unique'
      });
    }

    const password    = await hashPassword(data.password);
    const user        = await userService.createUser({ ...data, password });
    const accessToken = createAccessToken(user.id);
    
    response.send({ accessToken });
  }

  public async signIn(request: Request, response: Response) {
    const data = request.body as ISignInSchema;
    const user = await userService.findUserByEmail(data.email);

    if (user === null) {
      return response.status(404).send({
        code   : 'user-not-found',
        message: 'User not found'
      });
    }

    const isCorrectPassword = await comparePasswords(data.password, user.password);

    if (!isCorrectPassword) {
      return response.status(401).send({
        code   : 'invalid-password',
        message: 'Password is not valid'
      });
    }

    const accessToken = createAccessToken(user.id);
    
    response.send({ accessToken });
  }
}

export const authController = new AuthController();
