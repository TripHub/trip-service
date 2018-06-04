const knex = require('knex')(require('../../knexfile'))
const bookshelf = require('bookshelf')(knex)

// registry plugin resolves circular references and allows
// specification of relations using strings instead of variables.
// http://bookshelfjs.org/#plugins
bookshelf.plugin('registry')
// Case converter handles the conversion between the database's snake_cased and
// a model's camelCased properties automatically.
bookshelf.plugin('case-converter')
// Add specific fields to white/black lists for serialisation.
bookshelf.plugin('visibility')

export default bookshelf
