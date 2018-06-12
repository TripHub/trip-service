/**
 * Location specific routes.
 * Note: CRUD endpoints are defined in `src/utils/crud`
 */

import { Request, Response, NextFunction } from 'express'
import { wrapAsync } from '../../utils/async'
import { dbErrors } from '../../utils/db/errorCodes'
import Trip from '../../models/trip'
import Location from '../../models/location'

/**
 * List all locations for a trip.
 * `id` in path params is the id of the trip to list locations for.
 */
export const getLocations = wrapAsync(async (req: Request, res: Response) => {
  // get id from the url
  const { id } = req.params
  // get the trip model
  const trip = await Trip
    .query()
    .findById(id)
  // get locations for trip instance
  const locations = await trip.$relatedQuery('locations')
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
  // check the trip exists
  const trip = await Trip
    .query()
    .findById(id)
    .throwIfNotFound()
  // create location for trip
  const location = await Location
    .query()
    .insert({
      ...req.body,
      trip_id: parseInt(id, 10)
    })
    .returning('*')

  return res.json(location)
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
  const targetLocation = await Location
    .query()
    .findById(target)
    .throwIfNotFound()
  // check next location exist
  const nextLocation = await Location
    .query()
    .findById(next)
    .throwIfNotFound()
  // save to database
  try {
    await targetLocation
      .$relatedQuery('next')
      .insert({
        // @ts-ignore
        next: parseInt(next),
        location_id: parseInt(target)
      })
  } catch (e) {
    // ignore error if its a unique violation (next location already exists)
    if (e.code !== dbErrors.UNIQUE) {
      throw (e)
    }
  }
  return res.sendStatus(204)
})

/**
 * Remove a location from the set of next locations.
 * @param req 
 * @param res 
 */
export const removeNextLocation = wrapAsync(async (req: Request, res: Response) => {
  // target location is specified in the params
  const { target, next } = req.params
  // attempt to get target location
  const targetLocation = await Location
    .query()
    .findById(target)
    .throwIfNotFound()
  // check next location exists
  await Location.query()
    .findById(next)
    .throwIfNotFound()
  // delete next location
  await targetLocation
    .$relatedQuery('next')
    .deleteById([ parseInt(target), parseInt(next) ])
  return res.sendStatus(204)
})

/**
 * Get the list of next locations for a location.
 * Request path should contain an `id` param for the location ID to get next
 * locations for.
 * @param req
 * @param res 
 */
export const getNextLocations = wrapAsync(async (req: Request, res: Response) => {
  // get location id to get next locations for
  const { id } = req.params
  // check location exists
  const location = await Location.query()
    .findById(id)
    .throwIfNotFound()
  // get next locations for location
  const nextLocations = await location
    .$relatedQuery('next')
  // return list
  return res.json(nextLocations)
})
