/**
 * Trip table schema.
 * https://triphub.gitbook.io/database/trips/db.trips
 */

const TABLE_NAME = 'trips'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    // fields
    table.increments('id').unsigned().primary().notNullable()
    table.string('pid', 11).unique().notNullable()
    table.string('title').notNullable()
    table.text('description').nullable()
    // table.string('picture', 511).nullable()
    table.timestamps(true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
