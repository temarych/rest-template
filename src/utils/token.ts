import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv                                        from 'dotenv';

dotenv.config();

const JWT_SECRET     = process.env.JWT_SECRET ?? 'SECRET';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '5min';

export interface IPayload {
  id: string;
}

export interface IParseTokenSuccess {
  success: true;
  id     : string;
}

export interface IParseTokenError {
  success: false;
  reason : 'invalid' | 'expired';
}

export type IParseTokenResult = IParseTokenSuccess | IParseTokenError;

export const createAccessToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const parseToken = (token: string): IParseTokenResult => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    return { success: true, id: payload.id };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { success: false, reason: 'expired' };
    }
    if (error instanceof JsonWebTokenError) {
      return { success: false, reason: 'invalid' };
    }
    throw error;
  }
};
