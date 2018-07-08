import { Router } from 'express'
import { getInvitation, updateInvitation } from '../../controllers/invitation'

const router = Router()

router.get('/:iid', getInvitation)
router.patch('/:iid', updateInvitation)

export default router