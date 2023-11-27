import { Request, Response, NextFunction } from 'express';
import { usersService }                    from '@modules/users/users.service';
import { parseToken }                      from '@utils/token';
import { HttpError }                       from '@utils/error';

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = request.headers.authorization;

  if (accessToken === undefined) {
    throw new HttpError(401, {
      type   : 'no-jwt',
      message: 'No access token provided',
    });
  }

  const result = parseToken(accessToken);

  if (!result.success && result.reason === 'expired') {
    throw new HttpError(401, {
      type   : 'jwt-expired',
      message: 'Access token is expired',
    });
  }

  if (!result.success) {
    throw new HttpError(401, {
      type   : 'jwt-invalid',
      message: 'Access token is not valid',
    });
  }

  const user = await usersService.findUserById(result.id);

  if (user === null) {
    throw new HttpError(401, {
      type   : 'jwt-invalid',
      message: 'Access token is not valid',
    });
  }

  request.user = user;

  return next();
};
