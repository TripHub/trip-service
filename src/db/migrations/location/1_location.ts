exports.up = knex => {
  return knex.schema.createTable('location', table => {
    table.increments('id')
    table.uuid('pid').notNullable()
    table.string('title').notNullable()
    table.string('picture', 511)
    table.float('lat', 11, 3)
    table.float('lng', 11, 3)
    table.string('google_place_id')
    table.jsonb('for').notNullable()
    table.jsonb('next')
    table.datetime('arrive')
    table.datetime('depart')
    table.timestamps(false, true)
  
    table.unique(['pid'])
    table.index(['pid'])
  })
}

exports.down = knex => {
  return knex.schema.dropTable('location')
}
