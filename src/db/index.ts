const { Pool } = require('pg')

// Connection info defined in env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

pool.on('error', (err, client) => {
  console.error('an unexpected pg error occurred', client, err)
  process.exit(1)
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
