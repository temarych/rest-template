import { IUser }                          from '@modules/users/users.model';
import { usersService }                   from '@modules/users/users.service';
import { HttpError }                      from '@utils/error';
import { comparePasswords, hashPassword } from '@utils/password';
import { createAccessToken }              from '@utils/token';

class AuthService {
  public async signUp(data: Omit<IUser, 'id' | 'createdAt'>) {
    const isEmailUnique = await usersService.isEmailUnique(data.email);

    if (!isEmailUnique) {
      throw new HttpError(400, {
        type   : 'email-not-unique',
        message: 'Email not unique'
      });
    }

    const isUsernameUnique = await usersService.isUsernameUnique(data.username);

    if (!isUsernameUnique) {
      throw new HttpError(400, {
        type   : 'username-not-unique',
        message: 'Username not unique'
      });
    }

    const password    = await hashPassword(data.password);
    const user        = await usersService.createUser({ ...data, password });
    const accessToken = createAccessToken(user.id);

    return accessToken;
  }

  public async signIn(data: Pick<IUser, 'email' | 'password'>) {
    const user = await usersService.findUserByEmail(data.email);

    if (user === null) {
      throw new HttpError(400, {
        type   : 'user-not-found',
        message: 'User not found'
      });
    }

    const isCorrectPassword = await comparePasswords(data.password, user.password);

    if (!isCorrectPassword) {
      throw new HttpError(400, {
        type   : 'invalid-password',
        message: 'Password is not valid'
      });
    }

    const accessToken = createAccessToken(user.id);

    return accessToken;
  }
}

export const authService = new AuthService();
