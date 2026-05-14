// Creates and exports a pg connection pool using credentials from .env
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

module.exports = pool 