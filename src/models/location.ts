import { Model, snakeCaseMappers } from 'objection'
import { PidTimestampModel } from '../utils/model'

export default class Location extends PidTimestampModel {
  static tableName = 'locations'
  static get modelPaths () {
    return [__dirname]
  }
  static columnNameMappers = snakeCaseMappers()

  static get relationMappings () {

    return {
      next: {
        relation: Model.HasManyRelation,
        modelClass: 'location_next',
        join: {
          from: 'locations.id',
          to: 'locations_next.location_id'
        }
      },
      members: {
        relation: Model.HasManyRelation,
        modelClass: 'location_member',
        join: {
          from: 'locations.id',
          to: 'locations_members.location_id'
        }
      },
      trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'trip',
        join: {
          from: 'locations.trip_id',
          to: 'trips.id'
        }
      }
    }
  }

  static jsonSchema = {
    type: 'object',
    required: ['title', 'lat', 'lng'],
    properties: {
      id: { type: 'integer' },
      pid: { type: 'string' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      lat: { type: 'number', minimum: -90, maximum: 90 },
      lng: { type: 'number', minimum: -180, maximum: 180 },
      google_place_id: { type: 'string' }
    }
  }

  $parseJson (json, opt) {
    json = super.$parseJson(json, opt)

    // parse lat/lng as floats
    json.lat = parseFloat(json.lat)
    json.lng = parseFloat(json.lng)

    return json
  }
}
