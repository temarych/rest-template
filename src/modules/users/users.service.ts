import { IUser }           from '@modules/users/users.model';
import { usersRepository } from '@modules/users/users.repository';

class UsersService {
  public async createUser(data: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
    return await usersRepository.save(data);
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return await usersRepository.findByEmail(email);
  }

  public async findUserById(id: string): Promise<IUser | null> {
    return await usersRepository.findById(id);
  }

  public async deleteUserByEmail(email: string): Promise<void> {
    await usersRepository.findByEmail(email);
  }

  public async deleteUserById(id: string): Promise<void> {
    await usersRepository.findByEmail(id);
  }

  public async countEmails(email: string): Promise<number> {
    return await usersRepository.countEmails(email);
  }

  public async countUsernames(username: string): Promise<number> {
    return await usersRepository.countUsernames(username);
  }

  public async isEmailUnique(email: string): Promise<boolean> {
    const emailCount = await this.countEmails(email);
    return emailCount === 0;
  }

  public async isUsernameUnique(username: string): Promise<boolean> {
    const usernameCount = await this.countUsernames(username);
    return usernameCount === 0;
  }
}

export const usersService = new UsersService();
