import { db }          from '@config/db';
import { IUser, User } from './users.model';

export interface IUserData {
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

class UsersRepository {
  public async save(data: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
    const result = await db.query<IUserData>(
      `
        INSERT INTO users(email, username, password)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [data.email, data.username, data.password]
    );

    const userData = result.rows[0];

    const user = new User({
      ...userData,
      createdAt: userData.created_at
    });

    return { ...user };
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const result = await db.query<IUserData>(
      `
        SELECT * FROM users
        WHERE email = $1
      `,
      [email]
    );

    const userData = result.rows[0];

    if (!userData) return null;

    const user = new User({
      ...userData,
      createdAt: userData.created_at
    });

    return { ...user };
  }

  public async findById(id: string): Promise<IUser | null> {
    const result = await db.query<IUserData>(
      `
        SELECT * FROM users
        WHERE id = $1
      `,
      [id]
    );

    const userData = result.rows[0];

    if (!userData) return null;

    const user = new User({
      ...userData,
      createdAt: userData.created_at
    });

    return { ...user };
  }

  public async deleteByEmail(email: string): Promise<void> {
    await db.query(
      `
        DELETE FROM users
        WHERE email = $1
      `,
      [email]
    );
  }

  public async deleteById(id: string): Promise<void> {
    await db.query(
      `
        DELETE FROM users
        WHERE id = $1
      `,
      [id]
    );
  }

  public async countEmails(email: string): Promise<number> {
    const result = await db.query<IEmailCountData>(
      `
        SELECT COUNT(*) as email_count FROM users
        WHERE email = $1
      `,
      [email]
    );
    
    return parseInt(result.rows[0].email_count);
  }

  public async countUsernames(username: string): Promise<number> {
    const result = await db.query<IUsernameCountData>(
      `
        SELECT COUNT(*) as username_count FROM users
        WHERE username = $1
      `,
      [username]
    );
    
    return parseInt(result.rows[0].username_count);
  }
}

export const usersRepository = new UsersRepository();
