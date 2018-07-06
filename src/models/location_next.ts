import { Model } from 'objection'

export default class LocationNext extends Model {
  static tableName = 'locations_next'
  static idColumn = ['location_id', 'user_id']

  static jsonSchema = {
    type: 'object',
    required: ['location_id', 'user_id', 'next'],
    properties: {
      location_id: { type: 'number' },
      user_id: { type: 'string' },
      next: { type: 'number' },
    }
  }
}
