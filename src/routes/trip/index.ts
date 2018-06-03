import { Request, Response, Router } from 'express'
import { trip } from '../../controllers'

const router = Router()

router.get('/', trip.all)
router.post('/', trip.create)
router.get('/:id', trip.get)
router.put('/:id', trip.update)
router.delete('/:id', trip.remove)

export default router
