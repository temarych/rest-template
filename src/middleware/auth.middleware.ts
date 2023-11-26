import { Request, Response, NextFunction } from 'express';
import { parseToken }                      from '@utils/token';
import { userService }                     from '@entities/user/user.service';

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = request.headers.authorization;

  if (accessToken === undefined) {
    return response.status(401).send({
      code   : 'no-jwt',
      message: 'No access token provided',
    });
  }

  const result = parseToken(accessToken);

  if (!result.success && result.reason === 'expired') {
    return response.status(401).send({
      code   : 'jwt-expired',
      message: 'Access token is expired',
    });
  }

  if (!result.success) {
    return response.status(401).send({
      code   : 'jwt-invalid',
      message: 'Access token is not valid',
    });
  }

  const user = await userService.findUserById(result.id);

  if (user === null) {
    return response.status(401).send({
      code   : 'jwt-invalid',
      message: 'Access token is not valid',
    });
  }

  request.user = user;

  return next();
};
