/**
 * Location specific routes.
 * Note: CRUD endpoints are defined in `src/utils/crud`
 */

import { Request, Response, NextFunction } from 'express'
import { Model } from 'objection'

import { wrapAsync } from '../../utils/async'
import { dbErrors } from '../../utils/db/errorCodes'
import { getUserTrips } from '../../utils/model/trips'
import Trip from '../../models/trip'
import Location from '../../models/location'

/**
 * List all locations for a trip.
 * `id` in path params is the id of the trip to list locations for.
 * 
 * GET /trips/:id/locations
 * https://triphub.gitbook.io/trip-service/locations#list-trips-locations
 */
export const getLocations = wrapAsync(async (req: Request, res: Response) => {
  // get id from the url
  const { id } = req.params
  // get the trip model
  const trip = await getUserTrips(req.user.sub)
    .findById(id)
    .throwIfNotFound()
  // get locations for trip instance
  const locations = await trip.$relatedQuery('locations')
  // return locations
  return res.json(locations)
})

/**
 * Create a new location on the specified trip.
 * `id` in path params is the id of the trip to add the location to.
 * 
 * POST /locations
 * https://triphub.gitbook.io/trip-service/locations#create-location
 */
export const createLocation = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  // get the trip id
  const { id } = req.params
  // check the trip exists
  const trip = await getUserTrips(req.user.sub)
    .findById(id)
    .throwIfNotFound()
  // create the location
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
 * Get the list of next locations for a location.
 * Request path should contain an `id` param for the location ID to get next
 * locations for.
 * 
 * GET /locations/:id/next
 * https://triphub.gitbook.io/trip-service/locations#get-next-locations
 */
export const getNextLocations = wrapAsync(async (req: Request, res: Response) => {
  // get location id to get next locations for
  const { id } = req.params
  // check location belongs to a trip the user belongs to
  const userTrips = getUserTrips(req.user.sub)
  const location = Location.query().findById(id).throwIfNotFound()
  // resolve promises concurrently
  Promise.all([location, userTrips])
    .then(([ location, userTrips ]) => {
      const userTripsIds: number[] = userTrips.map((T: Model) => T.$id())
      // check location belongs to one of the user's trips
      if (!userTripsIds.includes(location.$id())) {
        return res.sendStatus(404)
      }
      // get next locations for location
      const nextLocations = location
        .$relatedQuery('members')
        .then(response => res.json(response))
    })
})

/**
 * Add a location to the set of next locations.
 * `target` in path params is the target location.
 * `next` in the path params is the location to add to the target location.
 * 
 * PATCH /locations/:target/next/:next
 * https://triphub.gitbook.io/trip-service/locations#add-next-location
 */
export const addNextLocation = wrapAsync(async (req: Request, res: Response) => {
  // target location is specified in the params
  const { target, next } = req.params
  // user id from req
  const { sub } = req.user
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
      .$relatedQuery('members')
      .insert({
        // @ts-ignore
        next: parseInt(next),
        location_id: parseInt(target),
        user_id: sub,
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
 * 
 * DELETE /locations/:target/next/:next
 * https://triphub.gitbook.io/trip-service/locations#remove-next-location
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
    .$relatedQuery('members')
    .deleteById([ parseInt(target), parseInt(next) ])
  return res.sendStatus(204)
})
