/**
 * knexfile.js
 * Contains knex configurations
 * https://knexjs.org/#knexfile
 */
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
