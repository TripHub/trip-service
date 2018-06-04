exports.up = function (knex, Promise) {
  /**
   * Primary Trip table.
   */
  return knex.schema.createTable('trip', function (table) {
    table.increments('id').unsigned().primary()
    table.string('pid', 11).unique().notNullable()
    table.string('title').notNullable()
    // table.text('description').nullable()
    // table.string('picture', 511).nullable()
    table.timestamps(true)
  })
  /**
   * Related Locations table.
   */
  .createTable('location', function (table) {
    table.increments('id').unsigned().primary()
    table.integer('trip_id').references('trip.id').notNullable()
    table.string('title').notNullable()
    // table.string('pid', 11).unique().notNullable()
    // table.string('picture', 511)
    // table.float('lat', 11, 3)
    // table.float('lng', 11, 3)
    // table.string('google_place_id')
    // table.jsonb('for').notNullable()
    // table.jsonb('next')
    // table.datetime('arrive')
    // table.datetime('depart')
    table.timestamps(true)
  })
  /**
   * Related Members table.
   */
  .createTable('member', function (table) {
    table.integer('trip_id').references('trip.id').notNullable()
    table.string('user').notNullable()
    table.enu('role', ['admin', 'member'])
    table.timestamps(true)

    // compound primary key
    table.primary(['trip_id', 'user'])
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('trip')
    .dropTable('location')
    .dropTable('member')
}
