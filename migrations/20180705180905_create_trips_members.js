/**
 * Trips Members table schema.
 * https://triphub.gitbook.io/database/trips/db.trips_members
 */

const TABLE_NAME = 'trips_members'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('trips_members', function (table) {
    // fields
    table.integer('trip_id').unsigned().notNullable()
    table.string('user_id').notNullable()
    table.primary(['trip_id', 'user_id'])
    table.enu('role', ['admin', 'member']).defaultTo('member').notNullable()
    table.timestamps(true)
    // relations
    table.foreign('trip_id')
      .references('trips.id')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
