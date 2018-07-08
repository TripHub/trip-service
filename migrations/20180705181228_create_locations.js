/**
 * Locations table schema.
 * https://triphub.gitbook.io/database/locations/db.locations
 */

export const TABLE_NAME = 'locations'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id').unsigned().notNullable().primary()
    table.string('pid', 11).unique().notNullable()
    table
      .integer('trip_id')
      .references('trips.id')
      .onDelete('CASCADE')
      .notNullable()
    table.string('title').notNullable()
    // table.string('picture', 511)
    table.float('lat', 9, 3).notNullable()
    table.float('lng', 9, 3).notNullable()
    table.string('google_place_id')
    table.timestamps(true)
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable(TABLE_NAME)
}
