/**
 * Schema documentation at:
 * https://triphub.gitbook.io/database/locations/db.travel
 */

export const TABLE_NAME = 'locations_travel'

exports.up = function (knex, Promise) {
  const type_values = [
    'walk',
    'train',
    'plane',
    'boat',
    'car',
    'taxi',
    'bus',
  ]

  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id').unsigned().notNullable().primary()
    table.enu('type', type_values).notNullable().defaultTo('walk')
    table.timestamp('depart_time')
    table.timestamp('arrive_time')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
