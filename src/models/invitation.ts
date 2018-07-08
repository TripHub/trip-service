const randomstring = require('randomstring')
import { TimestampModel } from '../utils/model'

export default class Invitation extends TimestampModel {
  static tableName = 'invitations'

  static get modelPaths () {
    return [__dirname]
  }

  static jsonSchema = {
    type: 'object',
    required: ['trip_id', 'created_by', 'expires_at'],
    properties: {
      trip_id: { type: 'number' },
      created_by: { type: 'string' },
    }
  }

  /**
   * Create the unique string ID.
   */
  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)
    // @ts-ignore
    this.id = randomstring.generate(32)
  }
}
