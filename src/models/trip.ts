const checkit = require('checkit')
import { setPid } from '../utils/model'
import bookshelf from '../db'

const Trip = bookshelf.Model.extend({
  tableName: 'trip',
  hasTimestamps: true,
  /**
   * Actions to perform upon creation.
   */
  initialize: function () {
    this.constructor.__super__.initialize.apply(this, arguments)
    this.on('saving', setPid)
  },
  /**
   * A trip contains an array of starting locations.
   */
  locations: function () {
    return this.hasMany('Location')
  },
  /**
   * A trip contains an array of members.
   */
  members: function () {
    return this.hasMany('Member')
  },
  /**
   * Change db data before loading to model.
   */
  parse: (res) => {
    return res
  },
  /**
   * Change model data before persisting to db.
   */
  format: (res) => {
    return res
  }
})

export default bookshelf.model('Trip', Trip)
