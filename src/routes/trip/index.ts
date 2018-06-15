import { Request, Response, Router } from 'express'
import { getLocations, createLocation } from '../../controllers/location'
import { getMembers, createMember } from '../../controllers/member'
import { retrieve, create } from '../../controllers/trip'
import { list, update, remove } from '../../utils/crud'
import Trip from '../../models/trip'

const router = Router()

// crud endpoints
list(router)(Trip)
update(router)(Trip)
remove(router)(Trip)
// create a trip
router.post('/', create)
// list trip locations
router.get('/:id/locations', getLocations)
// get trip details and related details
router.get('/:id', retrieve)
// create location
router.post('/:id/locations', createLocation)
// list trip members
router.get('/:id/members', getMembers)
// create trip member
router.post('/:id/members', createMember)

export default router
