import { Router } from 'express'
import { getLocations, createLocation } from '../../controllers/location'
import { getMembers, createMember } from '../../controllers/member'
import { list, retrieve, create } from '../../controllers/trip'
import { listInvitations, createInvitation } from '../../controllers/invitation'
import { update, remove } from '../../utils/crud'
import Trip from '../../models/trip'

const router = Router()

// crud endpoints
update(router)(Trip)
remove(router)(Trip)
// list user trips
router.get('/', list)
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
// list trip invitation
router.get('/:id/invitations', listInvitations)
// create trip invitation
router.post('/:id/invitations', createInvitation)

export default router
