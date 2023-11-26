import bcrypt from 'bcrypt';

export const PASSWORD_HASH_ROUNDS = Number(process.env.PASSWORD_HASH_ROUNDS ?? 10);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);
};

export const comparePasswords = async (actualPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(actualPassword, hashedPassword);
};
