const { Pool } = require('pg')
require("dotenv").config()


const CONCURRENT_CONNECTIONS = 5;
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432
  };
const pool = new Pool(dbOptions, CONCURRENT_CONNECTIONS);

const executeQuery = async(query, ...params) => {
    const arr = []
    params.forEach((p) => arr.push(p))
    const connection = await pool.connect();
    try {
        return await connection.query(query, arr);
    } finally {
        connection.release();
    }
};

module.exports = { executeQuery, pool }