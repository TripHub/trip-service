import { Request, Response, Router } from 'express'
import tripRouter from './trip'

const router = Router()

router.use('/trips', tripRouter)

export default router
