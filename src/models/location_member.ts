import { Model } from 'objection'

export default class LocationMember extends Model {
  static tableName = 'locations_members'
  static idColumn = ['locationId', 'userId']

  static jsonSchema = {
    type: 'object',
    required: ['location_id', 'user_id'],
    properties: {
      location_id: { type: 'number' },
      user_id: { type: 'string' },
    }
  }
}
