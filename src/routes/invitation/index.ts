import { Router } from 'express'
import { getInvitation, updateInvitation, rsvpInvitation } from '../../controllers/invitation'

const router = Router()

router.get('/:iid', getInvitation)
router.post('/:iid', rsvpInvitation)
router.patch('/:iid', updateInvitation)

export default router