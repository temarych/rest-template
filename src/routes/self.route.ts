import { Router }         from 'express';
import { selfController } from '@controllers/self.controller';
import { authorize }      from '@middleware/auth.middleware';

export const selfRoute = Router();

selfRoute.get('/', authorize, selfController.getSelf);
selfRoute.delete('/', authorize, selfController.deleteSelf);
