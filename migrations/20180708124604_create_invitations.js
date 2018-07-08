/**
 * Invitations Schema
 * 
 */

import { TABLE_NAME as trips } from './20180603120355_create_trips'

export const TABLE_NAME = 'invitations'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.string('id', 32).notNullable().primary()
    table.timestamp('expires_on')
    table.bool('is_used').defaultTo(false).notNullable()
    table.string('invited_by').notNullable()
    table.integer('trip_id')
      .references(`${trips}.id`)
      .onDelete('CASCADE')
      .notNullable()

    table.timestamps(true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
