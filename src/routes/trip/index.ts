import { Request, Response, Router } from 'express'
import { getLocations, createLocation } from '../../controllers/location'
import { getMembers, createMember } from '../../controllers/member'
import { list, retrieve, create, update, remove } from '../../utils/crud'
import Trip from '../../models/trip'

const router = Router()

// crud endpoints
list(router)(Trip)
retrieve(router)(Trip)
create(router)(Trip)
update(router)(Trip)
remove(router)(Trip)
// list trip locations
router.get('/:id/locations', getLocations)
// create location
router.post('/:id/locations', createLocation)
// list trip members
router.get('/:id/members', getMembers)
// create trip member
router.post('/:id/members', createMember)

export default router
