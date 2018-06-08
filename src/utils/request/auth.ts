import { Request, Response, NextFunction } from 'express'

export const hasAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization') || req.header('authorization')
  if (!authHeader) {
    res.status(403).json({ error: 'Missing authorisation' })
    next('router')
  }
  next()
}
