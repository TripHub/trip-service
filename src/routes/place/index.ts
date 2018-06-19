import { Router } from 'express'
import { placeSearch } from '../../controllers/place'

const router = Router()

router.get('/search', placeSearch)

export default router
