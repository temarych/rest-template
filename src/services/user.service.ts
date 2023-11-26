import { db }    from '@config/db';
import { IUser } from '@models/user.model';

interface IsEmailUniqueQuery {
  email_count: string;
}

interface IsUsernameUniqueQuery {
  username_count: string;
}

class UserService {
  public async createUser(data: Omit<IUser, 'id' | 'createdAt'>) {
    const result = await db.query<IUser>(`
      INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *
    `, [data.email, data.username, data.password]);

    return result.rows.at(0) as IUser;
  }

  public async findUserByEmail(email: string) {
    const result = await db.query<IUser>(`
      SELECT * FROM users WHERE email = $1
    `, [email]);

    return result.rows.at(0) ?? null;
  }

  public async findUserById(id: string) {
    const result = await db.query<IUser>(`
      SELECT * FROM users WHERE id = $1
    `, [id]);

    return result.rows.at(0) ?? null;
  }

  public async deleteUserByEmail(email: string) {
    const result = await db.query<IUser>(`
      DELETE FROM users WHERE email = $1
    `, [email]);
    
    return result.rows.at(0) ?? null;
  }

  public async deleteUserById(id: string) {
    const result = await db.query<IUser>(`
      DELETE FROM users WHERE id = $1
    `, [id]);
    
    return result.rows.at(0) ?? null;
  }

  public async isEmailUnique(email: string) {
    const result = await db.query<IsEmailUniqueQuery>(`
      SELECT COUNT(*) as email_count FROM users WHERE email = $1
    `, [email]);
    
    return parseInt(result.rows[0].email_count) === 0;
  }

  public async isUsernameUnique(username: string) {
    const result = await db.query<IsUsernameUniqueQuery>(`
      SELECT COUNT(*) as username_count FROM users WHERE username = $1
    `, [username]);
    
    return parseInt(result.rows[0].username_count) === 0;
  }
}

export const userService = new UserService();
