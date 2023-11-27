import { IUser }          from '@entities/user/user.model';
import { userRepository } from '@entities/user/user.repository';

class UserService {
  public async createUser(data: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
    return await userRepository.save(data);
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.findByEmail(email);
  }

  public async findUserById(id: string): Promise<IUser | null> {
    return await userRepository.findById(id);
  }

  public async deleteUserByEmail(email: string): Promise<void> {
    await userRepository.findByEmail(email);
  }

  public async deleteUserById(id: string): Promise<void> {
    await userRepository.findByEmail(id);
  }

  public async countEmails(email: string): Promise<number> {
    return await userRepository.countEmails(email);
  }

  public async countUsernames(username: string): Promise<number> {
    return await userRepository.countUsernames(username);
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

export const userService = new UserService();
