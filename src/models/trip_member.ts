import { Model } from 'objection'
import { TimestampModel } from '../utils/model'

export default class TripMember extends TimestampModel {
  static tableName = 'trips_members'
  static idColumn = ['trip_id', 'user_id']
  static get modelPaths () {
    return [__dirname]
  }

  static get relationMappings () {
    return {
      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'trip',
        join: {
          from: 'trips_members.trip_id',
          to: 'trips.id'
        }
      }
    }
  }

  static jsonSchema = {
    type: 'object',
    required: ['trip_id', 'user_id'],
    properties: {
      trip_id: { type: 'number' },
      user_id: { type: 'string' },
      role: { type: 'string' }
    }
  }
}
