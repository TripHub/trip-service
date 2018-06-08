/**
 * Location specific routes.
 * Note: CRUD endpoints are defined in `src/utils/crud`
 */

import { Request, Response, NextFunction } from 'express'
import { wrapAsync } from '../../utils/async'
import Trip from '../../models/trip'
import Member from '../../models/trip_member'

/**
 * List all locations for a trip.
 * `id` in path params is the id of the trip to list locations for.
 */
export const getMembers = wrapAsync(async (req: Request, res: Response) => {
  // get id from the url
  const { id } = req.params
  // get the trip model
  const instance = await Trip
    .query()
    .findById(id)
  // get locations for trip instance
  const locations = await instance.$relatedQuery('members')
  // return locations
  return res.json(locations)
})

/**
 * Create a new location on the specified trip.
 * `id` in path params is the id of the trip to add the location to.
 * @param req 
 * @param res 
 */
export const createMember = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  // get the trip id
  const { id } = req.params
  // check trip exists
  const trip = await Trip
    .query()
    .findById(id)
    .throwIfNotFound()
  // attempt to create member
  const member = await Member
    .query()
    .insert({
      ...req.body,
      trip_id: parseInt(id, 10)
    })
  // return successfully created instance
  return res.json(member)
})
