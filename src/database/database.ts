import { Pool, Query, QueryArrayConfig, Client, QueryConfig } from 'pg';
import 'dotenv/config';

const dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
  ssl: true,
  max: 5,
};
const pool = new Pool(dbOptions);

const executeQuery = async (queryString: string, ...params: any[]) => {
  /*
    const arr: any[] | undefined = []
    params.forEach((p) => arr.push(p))
    */
  const query: QueryConfig = {
    text: queryString,
    values: params,
  };
  const connection = await pool.connect();
  try {
    return connection.query(query);
  } finally {
    connection.release();
  }
};

export { executeQuery, pool };
