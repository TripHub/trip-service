import { Request, Response, Router } from 'express'
const knex = require('../db')

/**
 * Takes a router and adds basic CRUD endpoints.
 * @param router Router
 */
export default (router: Router) => (table: string) => {
  /**
   * Get all resources.
   * @param req 
   * @param res 
   */
  router.get('/', (req: Request, res: Response) => {
    knex(table)
      .then(result => res.json(result))
      .catch(error => res.json({ error }))
  })

  /**
   * Get a single resource by ID.
   * URL param :id should be the id of the resource to retrieve.
   * @param req 
   * @param res 
   */
  router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    knex(table).where({ id })
      .then((result) => {
        // send result if it exists
        if (result[0]) {
          return res.send(result[0])
        }
        return res.sendStatus(404)
      })
      .catch(error => res.json({ error }))
  })

  /**
   * Creates a resource.
   * Data must be provided in the body.
   * @param req 
   * @param res 
   */
  router.post('/', (req: Request, res: Response) => {
    knex(table).insert(req.body, '*')
      .then(result => res.status(201).send(result[0]))
      .catch(error => res.status(400).json({ error }))
  })

  router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    knex(table).where({ id }).update(req.body, '*')
      .then((result) => {
        // result === [] row did not exist
        if (result[0]) {
          return res.json(result[0])
        }
        res.sendStatus(404)
      })
      .catch(error => res.status(500).json({ error }))
  })

  /**
   * Deletes a resource.
   * URL param :id should be the id of the resource to remove.
   * Note: named `remove` instead of `delete` because delete is a reserved word
   * in JavaScript.
   * @param req 
   * @param res 
   */
  router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    knex(table).where({ id }).del().returning('*')
      .then((result) => {
        // result === [] if `id` not in db
        if (result[0]) {
          return res.json(result[0])
        }
        res.sendStatus(404)
      })
      .catch(error => res.status(500).json({ error }))
  })
}
