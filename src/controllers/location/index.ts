/**
 * Location specific routes.
 * Note: CRUD endpoints are defined in `src/utils/crud`
 */

import { Request, Response, NextFunction } from 'express'
import { wrapAsync } from '../../utils/async'
import Trip from '../../models/trip'
import Location from '../../models/location'
import LocationNext from '../../models/location_next'

/**
 * List all locations for a trip.
 * `id` in path params is the id of the trip to list locations for.
 */
export const getLocations = wrapAsync(async (req: Request, res: Response) => {
  // get id from the url
  const { id } = req.params
  // get the trip model
  const instance = await Trip
    .query()
    .findById(id)
  // get locations for trip instance
  const locations = await instance.$relatedQuery('locations')
  // return locations
  return res.json(locations)
})

/**
 * Create a new location on the specified trip.
 * `id` in path params is the id of the trip to add the location to.
 * @param req 
 * @param res 
 */
export const createLocation = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  // get the trip id
  const { id } = req.params
  // get the trip
  const trip = await Trip
    .query()
    .findById(id)
    .throwIfNotFound()
  // attempt to create location
  try {
    const location = await Location
      .query()
      .insert({
        ...req.body,
        trip_id: parseInt(id, 10)
      })
    return res.json(location)
  } catch (error) {
    next(error)
  }
})

/**
 * Add a location to the set of next locations.
 * `target` in path params is the target location.
 * `next` in the path params is the location to add to the target location.
 * @param req 
 * @param res 
 */
export const addNextLocation = wrapAsync(async (req: Request, res: Response) => {
  // target location is specified in the params
  const { target, next } = req.params
  // attempt to get target location
  const targetLocation = await Location.query().findById(target)
  // check next location exist
  const nextLocation = await Location.query().findById(next)
  // save to database
  console.log('will add...')
  return res.sendStatus(204)
  // const location = await LocationNext
  //   .query()
  //   .insert({
  //     locationId: target,
  //     next
  //   })
})

/**
 * Remve a location from the set of next locations.
 * @param req 
 * @param res 
 */
export const removeNextLocation = wrapAsync(async (req: Request, res: Response) => {
  // target location is specified in the params
  const { target, next } = req.params
  // attempt to get target location
  const targetLocation = await Location.query().findById(target)
  // check next location exists
  const nextLocation = await Location.query().findById(next)
  // save to database
  const instance = await LocationNext
    .query()
    .deleteById([target, next])
    .returning('*')
  return res.json(instance)
})
