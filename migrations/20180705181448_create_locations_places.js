/**
 * Locations table schema.
 * https://triphub.gitbook.io/database/locations/db.locations_places
 */

export const TABLE_NAME = 'locations_places'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id').unsigned().notNullable().primary()
    table
      .integer('location_id')
      .references('locations.id')
      .onDelete('CASCADE')
      .notNullable()
    table.string('title').notNullable()
    table.float('lat', 9, 3).notNullable()
    table.float('lng', 9, 3).notNullable()  
    table.string('google_place_id')

    table.timestamps(true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
