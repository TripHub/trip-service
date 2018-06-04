/**
 * Trip specific routes.
 * Note: CRUD endpoints are defined in `src/utils/crud`
 */

import { Request, Response } from 'express'
import Trip from '../../models/trip'

export const getLocations = (req: Request, res: Response) => {
  // get id from the url
  const { id } = req.params
  // get the trip model
  Trip.where({ id }).fetch({ withRelated: ['locations'] })
    .then((instance) => {
      if (!instance) {
        return res.sendStatus(404)
      }
      // load the relation
      const locations = instance.related('locations')
      res.json(locations)
    })
    .catch(error => res.status(500).json({ error }))
}
