exports.up = knex => {
  return knex.schema.createTable('trip', table => {
    table.increments('id')
    table.string('pid', 11).notNullable()
    table.string('title').notNullable()
    table.text('description')
    table.string('picture', 511)
    table.jsonb('owners').notNullable()
    table.jsonb('members')
    table.timestamps(false, true)
  
    table.unique(['pid'])
    table.index(['pid'])
  })
}

exports.down = knex => {
  return knex.schema.dropTable('trip')
}
