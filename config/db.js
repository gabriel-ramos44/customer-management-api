const { Pool } = require('pg')
require('dotenv').config()

const {
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT
} = process.env

const pool = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASS,
  port: DATABASE_PORT,
})

module.exports = pool