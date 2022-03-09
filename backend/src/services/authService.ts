import { executeQuery } from '../database/database';

const selectUserByUsername = async (username: string) => {
  return await executeQuery(
    'SELECT * FROM users WHERE username = $1;',
    username
  );
};

const insertUser = async (username: string, hash: string) => {
  await executeQuery(
    'INSERT INTO users (username, hash) VALUES ($1, $2);',
    username,
    hash
  );
};

export { selectUserByUsername, insertUser };
