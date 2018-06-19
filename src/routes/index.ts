import { Request, Response, Router } from 'express'
import tripRouter from './trip'
import locationRouter from './location'
import memberRouter from './member'
import placeRouter from './place'

const router = Router()

router.use('/trips', tripRouter)
router.use('/locations', locationRouter)
router.use('/places', placeRouter)
router.use('/members', memberRouter)

export default router
