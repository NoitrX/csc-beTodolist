const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
};
