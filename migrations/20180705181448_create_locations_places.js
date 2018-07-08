/**
 * Locations table schema.
 * https://triphub.gitbook.io/database/locations/db.locations_places
 */

const TABLE_NAME = 'locations_places'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    // fields
    table.increments('id').unsigned().primary().notNullable()
    table.integer('location_id').unsigned().notNullable()
    table.string('title').notNullable()
    table.float('lat', 9, 3).notNullable()
    table.float('lng', 9, 3).notNullable()  
    table.string('google_place_id').nullable()
    table.timestamps(true)
    // relations
    table.foreign('location_id')
      .references('locations.id')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
