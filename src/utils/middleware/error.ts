import { NotFoundError, ValidationError } from 'objection'

export const handleNotFoundError = (error, req, res, next) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      type: 'Not found',
      message: error.message
    })
  }
  next(error)
}

export const handleValidationError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      type: 'Validation error',
      message: error.message
    })
  }
  next(error)
}

export const handleUnknownError = (error, req, res, next) => {
  return res.status(500).json({
    type: error.type || 'Unknown error',
    message: 'An unknown error occurred, please try again later'
  })
}
