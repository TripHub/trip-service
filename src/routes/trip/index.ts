import { Request, Response, Router } from 'express'
import { trip } from '../../controllers'

const router = Router()

router.get('/', trip.all)
router.get('/:id', trip.get)

export default router
