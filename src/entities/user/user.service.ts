import { db }          from '@config/db';
import { IUser, User } from './user.model';

export interface IDbUserData {
  id        : string;
  email     : string;
  username  : string;
  password  : string;
  created_at: Date;
}

export interface IEmailCountData {
  email_count: string;
}

export interface IUsernameCountData {
  username_count: string;
}

class UserService {
  public async createUser(data: Omit<IUser, 'id' | 'createdAt'>): Promise<User> {
    const result = await db.query<IDbUserData>(
      `
        INSERT INTO users(email, username, password)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [data.email, data.username, data.password]
    );

    const dbUserData = result.rows[0];

    return new User({
      ...dbUserData,
      createdAt: dbUserData.created_at
    });
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const result = await db.query<IDbUserData>(
      `
        SELECT * FROM users
        WHERE email = $1
      `,
      [email]
    );

    const dbUserData = result.rows.at(0) ?? null;

    if (!dbUserData) return null;

    return new User({
      ...dbUserData,
      createdAt: dbUserData.created_at
    });
  }

  public async findUserById(id: string): Promise<User | null> {
    const result = await db.query<IDbUserData>(
      `
        SELECT * FROM users
        WHERE id = $1
      `,
      [id]
    );

    const dbUserData = result.rows.at(0) ?? null;

    if (!dbUserData) return null;

    return new User({
      ...dbUserData,
      createdAt: dbUserData.created_at
    });
  }

  public async deleteUserByEmail(email: string) {
    await db.query(
      `
        DELETE FROM users
        WHERE email = $1
      `,
      [email]
    );
  }

  public async deleteUserById(id: string) {
    await db.query(
      `
        DELETE FROM users
        WHERE id = $1
      `,
      [id]
    );
  }

  public async isEmailUnique(email: string) {
    const result = await db.query<IEmailCountData>(
      `
        SELECT COUNT(*) as email_count FROM users
        WHERE email = $1
      `,
      [email]
    );

    const emailCountData = result.rows[0];
    
    return parseInt(emailCountData.email_count) === 0;
  }

  public async isUsernameUnique(username: string) {
    const result = await db.query<IUsernameCountData>(
      `
        SELECT COUNT(*) as username_count FROM users
        WHERE username = $1
      `,
      [username]
    );

    const usernameCountData = result.rows[0];
    
    return parseInt(usernameCountData.username_count) === 0;
  }
}

export const userService = new UserService();
