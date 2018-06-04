const checkit = require('checkit')
import { setPid } from '../utils/model'
import bookshelf from '../db'

const Member = bookshelf.Model.extend({
  tableName: 'member',
  hasTimestamps: true,
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

export default bookshelf.model('Member', Member)
