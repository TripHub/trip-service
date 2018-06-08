import { Request, Response, NextFunction } from 'express'

export const wrapAsync = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Express still doesn't handle promises very well
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain so they can be caught by error handlers
    fn(req, res, next).catch(next)
  }
}