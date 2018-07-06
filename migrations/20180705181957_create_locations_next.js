/**
 * Schema documentation at
 * https://triphub.gitbook.io/database/locations/db.locations_members
 */

const TABLE_NAME = 'locations_next'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.integer('location_id').references('locations.id').notNullable()
    table.string('user_id').notNullable()
    table
      .integer('next')
      .references('locations.id')
      .onDelete('CASCADE')
    table
      .integer('travel')
      .references('locations_travel.id')
      .onDelete('CASCADE')
    // set the compound primary key
    table.primary(['location_id', 'user_id'])
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
