/**
 * Schema documentation at:
 * https://triphub.gitbook.io/database/locations/db.travel
 */

const TABLE_NAME = 'locations_travel'

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
    table.increments('id').unsigned().primary().notNullable()
    table.enu('type', type_values).defaultTo('walk').notNullable()
    table.timestamp('depart_time').nullable()
    table.timestamp('arrive_time').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}
