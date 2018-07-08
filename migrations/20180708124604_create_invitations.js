/**
 * Schema documentation at:
 * https://triphub.gitbook.io/database/invitations/db.invitations
 */

const TABLE_NAME = 'invitations'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, table => {
    // fields
    table.string('id', 32).primary().notNullable()
    table.integer('trip_id').unsigned().notNullable()
    table.bool('is_active').defaultTo(true).notNullable()
    table.string('invited_by').notNullable()
    table.timestamp('expires_on').nullable()
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
