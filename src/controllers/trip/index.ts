import { Request, Response } from 'express'
const db = require('../../db')

/**
 * Get all trips
 * @param req 
 * @param res 
 * @param next 
 */
export const all = (req: Request, res: Response) => {
  db.query('SELECT * FROM trip')
    .then(result => res.json(result.rows))
    .catch(error => res.json({ error }))
}

/**
 * Get a single trip by ID
 * @param req 
 * @param res 
 * @param next 
 */
export const get = (req: Request, res: Response) => {
  // id should be passed in the URL
  const id = req.params.id
  db.query('SELECT * FROM trip WHERE id = $1', [id])
    .then(result => result.rows[0])
    .then(item => item ? res.json(item) : res.status(404).json({}))
    .catch(error => res.json({ error }))
}
