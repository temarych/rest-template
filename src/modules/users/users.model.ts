export interface IUser {
  id       : string;
  email    : string;
  username : string;
  password : string;
  createdAt: Date;
}

export class User implements IUser {
  public id       : string;
  public username : string;
  public email    : string;
  public password : string;
  public createdAt: Date;

  constructor(data: IUser) {
    this.id        = data.id;
    this.username  = data.username;
    this.email     = data.email;
    this.password  = data.password;
    this.createdAt = data.createdAt;
  }
}
