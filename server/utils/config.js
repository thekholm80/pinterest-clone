require('dotenv').config();

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET
};
