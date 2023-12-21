const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongoUri: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
}