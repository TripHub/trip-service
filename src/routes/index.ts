import { Request, Response, Router } from 'express'
import tripRouter from './trip'
import locationRouter from './location'
import memberRouter from './member'

const router = Router()

router.use('/trips', tripRouter)
router.use('/locations', locationRouter)
router.use('/members', memberRouter)

export default router
