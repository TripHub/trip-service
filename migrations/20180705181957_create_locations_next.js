/**
 * Schema documentation at
 * https://triphub.gitbook.io/database/locations/db.locations_members
 */

const TABLE_NAME = 'locations_next'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    // fields
    table.integer('location_id').unsigned().notNullable()
    table.string('user_id').notNullable()
    table.primary(['location_id', 'user_id'])
    table.integer('next_location').unsigned().notNullable()
    table.integer('travel').unsigned().notNullable()  
    table.timestamps(true)
    // relations
    table.foreign('location_id')
      .references('locations.id')
      .onDelete('CASCADE')
    table.foreign('next_location')
      .references('locations.id')
      .onDelete('CASCADE')
    table.foreign('travel')
      .references('locations_travel.id')
      .onDelete('CASCADE')

  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
