import { Request, Response, Router } from 'express'
const bookshelf = require('../db')

/**
 * Get all resources.
 */
export const list = (router: Router) => (model) => {
  router.get('/', (req: Request, res: Response) => {
    model.fetchAll()
      .then(result => res.json(result))
      .catch(error => {
        console.error(error)
        res.json({ error })
      })
  })
}

/**
 * Get a single resource by ID.
 * URL param :id should be the id of the resource to retrieve.
 */
export const retrieve = (router: Router) => (model) => {
  router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    model.where({ id }).fetch({ require: true })
      .then(instance => res.json(instance))
      .catch(() => res.sendStatus(404))
  })
}

/**
 * Creates a resource.
 * Data must be provided in the body.
 */
export const create = (router: Router) => (model) => {
  router.post('/', (req: Request, res: Response) => {
    new model(req.body).save(null, { method: 'insert' })
      .then(result => res.status(201).json(result))
      .catch(error => res.status(400).json({ error }))
  })
}

export const update = (router: Router) => (model) => {
  router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    // get the current data
    model.where({ id }).fetch({ require: true })
      .then((instance) => {
        instance.save(req.body, {
          method: 'update',
          patch: true,
          require: true
        })
          .then(result => res.json(result))
          .catch(error => res.status(500).json({ error }))
      })
      .catch(() => res.sendStatus(404))
  })
}

/**
 * Deletes a resource.
 * URL param :id should be the id of the resource to remove.
 * Note: named `remove` instead of `delete` because delete is a reserved word
 * in JavaScript.
 */
export const remove = (router: Router) => (model) => {
  router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params
    model.forge({ id }).fetch({ require: true })
      .then((instance) => {
        instance.destroy()
          .then(() => res.sendStatus(204))
          .catch(error => res.status(500).json({ error }))
      })
      .catch(error => res.sendStatus(404))
  })
}
