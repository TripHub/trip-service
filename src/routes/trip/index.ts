import { Request, Response, Router } from 'express'
import { getLocations } from '../../controllers/trip'
import { list, retrieve, create, update, remove } from '../../utils/crud'
import Trip from '../../models/trip'

const router = Router()

// CRUD endpoints
list(router)(Trip)
retrieve(router)(Trip)
create(router)(Trip)
update(router)(Trip)
remove(router)(Trip)
// Custom endpoints
router.get('/:id/locations', getLocations)

export default router
