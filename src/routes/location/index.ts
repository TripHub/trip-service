import { Request, Response, Router } from 'express'
import { list, retrieve, create, update, remove } from '../../utils/crud'
import Location from '../../models/location'

const router = Router()

retrieve(router)(Location)
create(router)(Location)
update(router)(Location)
remove(router)(Location)

export default router
