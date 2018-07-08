const moment = require('moment')
import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from 'objection'

import { wrapAsync } from '../../utils/async'
import { getUserTrips } from '../../utils/model/trips'
// import Trip from '../../models/trip'
import Invitation from '../../models/invitation'

/**
 * Get details for a single invitation.
 * 
 * GET /invitations/:iid
 */
export const getInvitation = wrapAsync(async (req: Request, res: Response) => {
  // get invitation id
  const { iid } = req.params
  // check invitation exists
  const invitation = await Invitation
    .query()
    .findById(iid)
    .throwIfNotFound()
  // check invitation is active
  // @ts-ignore
  const isActive = invitation.is_active
  // @ts-ignore
  const isExpired = moment.utc(invitation.expires_at) < moment.utc()
  if (!isActive || isExpired) {
    res.status(403).json({ message: 'Invitation has expired.' })
  }
  // return the invitation
  return res.json(invitation)
})

/**
 * List invitations
 * 
 * GET /trips/:tid/invitations
 * https://triphub.gitbook.io/trip-service/invitations#get-a-trips-invitations
 */
export const listInvitations = wrapAsync(async (req: Request, res: Response) => {
  // get trip id
  const { id } = req.params
  // check trip exists
  const trip = await getUserTrips(req.user.sub)
    .findById(id)
    .throwIfNotFound()
  // get the list of all invitations for that trip
  const invitations = await Invitation
    .query()
    .where({ trip_id: id })
  res.json(invitations)
})

/**
 * Create an invitation
 * 
 * POST /trips/:tid/invitations
 * https://triphub.gitbook.io/trip-service/invitations#create-invitation
 */
export const createInvitation = wrapAsync(async (req: Request, res: Response) => {
  // get trip id
  const { id } = req.params
  // check trip exists
  const trip = await getUserTrips(req.user.sub)
    .findById(id)
    .throwIfNotFound()
  // create invitation
  const invitation = await Invitation
    .query()
    .insert({
      // @ts-ignore
      created_by: req.user.sub,
      trip_id: trip.$id(),
      is_active: true,
      expires_at: moment.utc().add(2, 'days').toISOString(),
    })
  res.status(201).json(invitation)
})

/**
 * Update an invitation
 * 
 * PATCH /invitations/:iid
 */
export const updateInvitation = wrapAsync(async (req: Request, res: Response) => {
  // get trip id
  const { iid } = req.params
  // find invitation
  const invitation = await Invitation
    .query()
    .findById(iid)
    .throwIfNotFound()
  // check user created the invitation
  // @ts-ignore
  if (invitation.created_by !== req.user.sub) {
    throw new NotFoundError()
  }
  // allowed fields to update
  const { is_active } = req.body
  // patch invitation
  const patchedInvitation = await invitation
    .$query()
    // @ts-ignore
    .patch({ is_active })
    .returning('*')
  res.json(patchedInvitation)
})
