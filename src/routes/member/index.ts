import { Request, Response, Router } from 'express'
import { update, create, remove } from '../../utils/crud'
import TripMember from '../../models/trip_member'

const router = Router()

update(router)(TripMember)
create(router)(TripMember)
remove(router)(TripMember)

export default router
