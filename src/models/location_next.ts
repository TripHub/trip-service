import { Model, snakeCaseMappers } from 'objection'

export default class LocationNext extends Model {
  static tableName = 'locations_next'
  static idColumn = ['locationId', 'next']
  static columnNameMappers = snakeCaseMappers()

  static jsonSchema = {
    type: 'object',
    required: ['location_id', 'next'],
    properties: {
      location_id: { type: 'number' },
      next: { type: 'number' },
    }
  }
}
