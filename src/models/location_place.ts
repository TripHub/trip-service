import { Model } from 'objection'

import { TimestampModel } from '../utils/model'

export default class LocationPlace extends TimestampModel {
  static tableName = 'locations_places'

  static get modelPaths () {
    return [__dirname]
  }
  
  static get relationMappings () {
    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'location',
        join: {
          from: 'locations_places.location_id',
          to: 'locations.id'
        }
      },
    }
  }

  static jsonSchema = {
    type: 'object',
    required: ['title', 'lat', 'lng'],
    properties: {
      id: { type: 'integer' },
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
