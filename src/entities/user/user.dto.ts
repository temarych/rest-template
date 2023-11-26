import { IUser } from './user.model';

export type IUserDTO = Omit<IUser, 'password'>;

export class UserDTO implements IUserDTO {
  public id       : string;
  public username : string;
  public email    : string;
  public createdAt: Date;

  constructor(data: IUserDTO) {
    this.id        = data.id;
    this.username  = data.username;
    this.email     = data.email;
    this.createdAt = data.createdAt;
  }
}
