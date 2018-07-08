import Trip from '../../../models/trip'

/**
 * Returns a knex QueryBuilder object containing only the specified user's
 * trips.
 * QueryBuilder info: https://vincit.github.io/objection.js/#querybuilder
 * @param userId - user ID to get trips for
 */
export const getUserTrips = userId => {
  return Trip
    .query()
    .joinRelation('members')
    .where('members.user_id', userId)
}
