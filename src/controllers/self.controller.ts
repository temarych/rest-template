import { Request, Response } from 'express';
import { IUser }             from '@models/user.model';
import { userService }       from '@services/user.service';
import { UserDTO }           from '@dtos/user.dto';

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
