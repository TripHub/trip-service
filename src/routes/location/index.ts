import { Router } from 'express'
import { retrieve, create, update, remove } from '../../utils/crud'
import { getNextLocations, addNextLocation, removeNextLocation } from '../../controllers/location'
import Location from '../../models/location'

const router = Router()

// crud routes
retrieve(router)(Location)
create(router)(Location)
update(router)(Location)
remove(router)(Location)
// custom routes
router.get('/:id/next', getNextLocations)
router.patch('/:target/next/:next', addNextLocation)
router.delete('/:target/next/:next', removeNextLocation)

export default router
