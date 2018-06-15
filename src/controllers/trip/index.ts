/**
 * Trip specific routes.
 */

import { Request, Response, NextFunction } from 'express'
import { wrapAsync } from '../../utils/async'
import Trip from '../../models/trip'

/**
 * 
 * @param userId 
 */
const getUserTrips = userId => {
  return Trip
    .query()
    .joinRelation('members')
    .where('members.user_id', userId)
}

/**
 * List all trips a user is a member of.
 */
export const list = wrapAsync(async (req: Request, res: Response) => {
  return res.json(
    await getUserTrips(req.user.sub))
})

/**
 * Gets a single trip based on id and returns it along with basic details on
 * locations and members.
 * @param req 
 * @param res 
 */
export const retrieve = wrapAsync(async (req: Request, res: Response) => {
  // get id from path params
  const { id } = req.params
  // query for instance
  const instance = await getUserTrips(req.user.sub)
    .findById(id)
    .eager('[locations, members]')
    .throwIfNotFound()
  // return instance details
  return res.json(instance)
})

/**
 * Cretes a new trip, setting the requesting user as the first admin member.
 * @param req 
 * @param res 
 * @param next 
 */
export const create = (req: Request, res: Response, next: NextFunction) => {
  // attempt to insert into database along with adding current user as the
  // first admin.
  Trip
    .query()
    .insertGraph({
      ...req.body,
      // add the request's user as the first admin member
      members: {
        user_id: req.user.sub,
        trip_id: parseInt('#ref'),
        role: 'admin'
      }
    })
    .returning('*')
    // return the instance
    .then(instance => res.status(201).json(instance))
    .catch(next)
}
