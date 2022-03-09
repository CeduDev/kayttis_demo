const { executeQuery } = require("../database/database.js")


const selectUserByUsername = async(username) => {
  return await executeQuery('SELECT * FROM users WHERE username = $1;', username)
};

const insertUser = async(username, hash) => {
  await executeQuery("INSERT INTO users (username, hash) VALUES ($1, $2);", username, hash)
};

module.exports = { selectUserByUsername, insertUser }