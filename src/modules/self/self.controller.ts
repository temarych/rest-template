import { Request, Response } from 'express';
import { IUser }             from '@modules/users/users.model';
import { UserDTO }           from '@modules/users/users.dto';
import { usersService }      from '@modules/users/users.service';

class SelfController {
  public async getSelf(request: Request, response: Response) {
    const user    = request.user as IUser;
    const userDTO = new UserDTO(user);

    response.send({ ...userDTO });
  }

  public async deleteSelf(request: Request, response: Response) {
    const user = request.user as IUser;
    await usersService.deleteUserById(user.id);
    response.send({ message: 'Your account was deleted' });
  }
}

export const selfController = new SelfController();
