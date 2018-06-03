import { Request, Response } from 'express'
const knex = require('../../db')

/**
 * Get all trips
 * @param req 
 * @param res 
 * @param next 
 */
export const all = (req: Request, res: Response) => {
  knex('trip')
    .then(result => res.json(result))
    .catch(error => res.json({ error }))
}

/**
 * Get a single trip by ID.
 * URL param :id should be the id of the trip to retrieve.
 * @param req 
 * @param res 
 * @param next 
 */
export const get = (req: Request, res: Response) => {
  const { id } = req.params
  knex('trip').where({ id })
    .then((result) => {
      // send result if it exists
      if (result[0]) {
        return res.send(result[0])
      }
      return res.sendStatus(404)
    })
    .catch(error => res.json({ error }))
}

/**
 * Creates a trip.
 * Data must be provided in the body.
 * @param req 
 * @param res 
 */
export const create = (req: Request, res: Response) => {
  const { title } = req.body
  knex('trip').insert({ title }, '*')
    .then(result => res.status(201).send(result[0]))
    .catch(error => res.status(400).json({ error }))
}

export const update = (req: Request, res: Response) => {
  const { id } = req.params
  const { title } = req.body
  knex('trip').where({ id }).update({ title }, '*')
    .then((result) => {
      // result === [] row did not exist
      if (result[0]) {
        return res.json(result[0])
      }
      res.sendStatus(404)
    })
    .catch(error => res.status(500).json({ error }))
}

/**
 * Deletes a trip.
 * URL param :id should be the id of the trip to remove.
 * Note: named `remove` instead of `delete` because delete is a reserved word in
 * JavaScript.
 * @param req 
 * @param res 
 */
export const remove = (req: Request, res: Response) => {
  const { id } = req.params
  knex('trip').where({ id }).del().returning('*')
    .then((result) => {
      // result === [] if `id` not in db
      if (result[0]) {
        return res.json(result[0])
      }
      res.sendStatus(404)
    })
    .catch(error => res.status(500).json({ error }))
}
