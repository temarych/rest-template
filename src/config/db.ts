import dotenv   from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const db = new Pool({
  host    : process.env.DATABASE_HOST,
  user    : process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});
