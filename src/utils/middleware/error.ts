import { Response, Request, NextFunction } from 'express'
import { NotFoundError, ValidationError } from 'objection'

const handleNotFoundError = (error, req, res, next) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      type: 'Not found',
      message: error.message
    })
  }
  next(error)
}

const handleValidationError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      type: 'Validation error',
      message: error.message
    })
  }
  next(error)
}

const handleUnknownError = (error, req, res, next) => {
  return res.status(500).json({
    type: error.type || 'Unknown error',
    message: 'An unknown error occurred, please try again later'
  })
}

export default (error, req: Request, res: Response, next: NextFunction) => {
  handleNotFoundError(error, req, res, next)
  handleValidationError(error, req, res, next)
  handleUnknownError(error, res, req, next)
}
