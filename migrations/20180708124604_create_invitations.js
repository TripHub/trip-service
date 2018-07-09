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
    table.string('created_by').notNullable()
    table.enu('role', ['member', 'admin']).defaultTo('member').notNullable()
    table.timestamp('expires_at').nullable()
    table.integer('claim_count').unsigned().defaultTo(0).notNullable()
    table.integer('claim_limit').unsigned().defaultTo(1).notNullable()
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
