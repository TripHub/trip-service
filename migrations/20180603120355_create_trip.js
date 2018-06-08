exports.up = function (knex, Promise) {
  /**
   * Primary Trip table.
   */
  return knex.schema.createTable('trips', function (table) {
    table.increments('id').unsigned().primary()
    table.string('pid', 11).unique().notNullable()
    table.string('title').notNullable()
    table.text('description').nullable()
    // table.string('picture', 511).nullable()
    table.timestamps(true)
  })
  /**
   * Trip Members table.
   */
  .createTable('trips_members', function (table) {
    table.integer('trip_id').references('trips.id').notNullable()
    table.string('user_id').notNullable()
    table.enu('role', ['admin', 'member']).notNullable().defaultTo('member')

    table.primary(['trip_id', 'user_id'])
    table.timestamps(true)
  })
  /**
   * Locations table.
   */
  .createTable('locations', function (table) {
    table.increments('id').unsigned().primary()
    table.string('pid', 11).unique().notNullable()
    table.integer('trip_id').references('trips.id').notNullable()
    table.string('title').notNullable()
    // table.string('picture', 511)
    table.float('lat', 9, 3).notNullable()
    table.float('lng', 9, 3).notNullable()
    table.string('google_place_id')
    table.datetime('arrive')
    table.datetime('depart')
    table.timestamps(true)
  })
  /**
   * Location Members table.
   */
  .createTable('locations_members', function (table) {
    table.integer('location_id').references('locations.id').notNullable()
    table.string('user_id').notNullable()

    table.primary(['location_id', 'user_id'])
  })
  /**
   * Location Next table.
   * Stores the next location(s) for a given location.
   */
  .createTable('locations_next', function (table) {
    table.integer('location_id').references('locations.id')
    table.integer('next').references('locations.id')

    table.primary(['location_id', 'next'])
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('trips')
    .dropTable('trips_members')
    .dropTable('locations')
    .dropTable('locations_members')
    .dropTable('locations_next')
}
