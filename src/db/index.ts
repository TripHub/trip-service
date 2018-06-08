const { Model } = require('objection')
const knex = require('knex')(require('../../knexfile'))

Model.knex(knex)
