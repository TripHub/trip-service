import { Request, Response, Router } from 'express'
import tripRouter from './trip'
import locationRouter from './location'

const router = Router()

router.use('/trips', tripRouter)
router.use('/locations', locationRouter)

export default router
