import { setPid } from '../utils/model'
import bookshelf from '../db'

const Location = bookshelf.Model.extend({
  tableName: 'location',
  hasTimestamps: true,
  /**
   * Actions to perform upon creation.
   */
  initialize: function () {
    this.constructor.__super__.initialize.apply(this, arguments)
    this.on('saving', setPid)
  },
  trip: () => this.belongsTo('Trip')
})

export default bookshelf.model('Location', Location)
