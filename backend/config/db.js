// Creates and exports a pg connection pool using credentials from .env
const dotenv = require('dotenv')
dotenv.config()
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
console.log(process.env.DATABASE_URL)
module.exports = pool 