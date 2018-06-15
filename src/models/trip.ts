import { Model } from 'objection'
import { PidTimestampModel } from '../utils/model'

export default class Trip extends PidTimestampModel {
  static tableName = 'trips'
  static get modelPaths () {
    return [__dirname]
  }

  static get relationMappings () {
    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: 'location',
        join: {
          from: 'trips.id',
          to: 'locations.trip_id'
        }
      },
      members: {
        relation: Model.HasManyRelation,
        modelClass: 'trip_member',
        join: {
          from: 'trips.id',
          to: 'trips_members.trip_id'
        }
      }
    }
  }

  static jsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer' },
      pid: { type: 'string' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string' },
    }
  }
}
