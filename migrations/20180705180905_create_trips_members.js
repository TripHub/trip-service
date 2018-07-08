/**
 * Trips Members table schema.
 * https://triphub.gitbook.io/database/trips/db.trips_members
 */

export const TABLE_NAME = 'trips_members'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('trips_members', function (table) {
    // compound primary key
    table.integer('trip_id').references('trips.id').onDelete('CASCADE').notNullable()
    table.string('user_id').notNullable()
    table.primary(['trip_id', 'user_id'])

    table.enu('role', ['admin', 'member']).notNullable().defaultTo('member')
    table.timestamps(true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
