exports.up = function (knex, Promise) {
  return knex.schema.createTable('trip', function (table) {
    table.increments('id').unsigned().primary()
    // table.string('pid', 11).notNullable()
    table.string('title').notNullable()
    // table.text('description').nullable()
    // table.string('picture', 511).nullable()
    // table.jsonb('owners').notNullable()
    // table.jsonb('members').notNullable()
    // table.timestamps(false, true)

    // table.unique(['pid'])
    // table.index(['pid'])
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('trip')
}
