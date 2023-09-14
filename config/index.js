const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.DATABASE_URL,
  secret: process.env.SECRET
};