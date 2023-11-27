import { Request, Response } from 'express';
import { IUser }             from '@entities/user/user.model';
import { UserDTO }           from '@entities/user/user.dto';
import { userService }       from '@services/user.service';

class SelfController {
  public async getSelf(request: Request, response: Response) {
    const user    = request.user as IUser;
    const userDTO = new UserDTO(user);

    response.send({ ...userDTO });
  }

  public async deleteSelf(request: Request, response: Response) {
    const user = request.user as IUser;
    await userService.deleteUserById(user.id);
    response.send({ message: 'Your account was deleted' });
  }
}

export const selfController = new SelfController();
