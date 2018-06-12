import { Model } from 'objection'
import { Request, Response, Router } from 'express'
import { wrapAsync } from './async'

/**
 * Get all resources.
 */
export const list = (router: Router) => (model) => {
  router.get('/', wrapAsync(async (req: Request, res: Response) => {
    const items = await model.query()
    return res.json(items)
  }))
}

/**
 * Get a single resource by ID.
 * URL param :id should be the id of the resource to retrieve.
 */
export const retrieve = (router: Router) => (model) => {
  router.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    // get id from path params
    const { id } = req.params
    // query for instance
    const instance = await model
      .query()
      .findById(id)
      .throwIfNotFound()
    // return instance details
    return res.json(instance)
  }))
}

/**
 * Creates a resource.
 * Data must be provided in the body.
 */
export const create = (router: Router) => (model) => {
  router.post('/', wrapAsync(async (req: Request, res: Response) => {
    // attempt to insert into database
    const instance = await model
      .query()
      .insert(req.body)
    // return successfully saved model
    return res.status(201).json(instance)
  }))
}

/**
 * Updates a resource.
 * URL param :id should be the id of the resource to update.
 */
export const update = (router: Router) => (model) => {
  router.patch('/:id', wrapAsync(async (req: Request, res: Response) => {
    // get id from path params
    const { id } = req.params
    // get the instance
    const instance = await model
      .query()
      .findById(id)
      .patch(req.body)
      .returning('*')
      .throwIfNotFound()
    // return the sucessfully patched instance
    return res.json(instance)
  }))
}

/**
 * Deletes a resource.
 * URL param :id should be the id of the resource to remove.
 * Note: named `remove` instead of `delete` because delete is a reserved word
 * in JavaScript.
 */
export const remove = (router: Router) => (model) => {
  router.delete('/:id', wrapAsync(async (req: Request, res: Response) => {
    // get the id from path params
    const { id } = req.params
    // attempt to delete the requested instance
    const instance = await model
      .query()
      .deleteById(id)
      .returning('*')
      .throwIfNotFound()
    // return the deleted instance
    return res.json(instance[0])
  }))
}
