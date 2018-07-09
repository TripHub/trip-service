const moment = require('moment')
import { Request, Response } from 'express'
import { NotFoundError } from 'objection'

import { wrapAsync } from '../../utils/async'
import { getUserTrips } from '../../utils/model/trips'
// import Trip from '../../models/trip'
import Trip from '../../models/trip'
import TripMember from '../../models/trip_member'
import Invitation from '../../models/invitation'

const isInvitationActive = invitation => {
  const { is_active, expires_at, claim_count, claim_limit } = invitation
  return is_active
    && moment.utc(expires_at) >= moment.utc()
    && claim_count < claim_limit
}

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
      role: req.body.role || 'member',
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

/**
 * Accept an invitation, adding the requesting user to that trip's member list.
 * 
 * POST /invitations/:iid
 * 
 */
export const rsvpInvitation = wrapAsync(async (req: Request, res: Response) => {
  // get invitation id
  const { iid } = req.params
  // get the action
  const { action } = req.body
  // get the user id
  const { sub } = req.user
  // check we have the accept action
  if (action !== 'accept') {
    res.status(400).json({ message: '`action` must be set to `accept`.' })
  }
  // get the invitation
  const invitation = await Invitation
    .query()
    .findById(iid)
    .throwIfNotFound()
  // check within expiry
  if (!isInvitationActive(invitation)) {
    return res.status(403).json({ message: 'Invitation has expired.' })
  }
  // check the invitation's trip exists
  const trip = await Trip
    .query()
    // @ts-ignore
    .findById(invitation.trip_id)
  if (!trip) {
    return res.status(400).json({ message: 'Related trip no longer exists.' })
  }
  // check member does not exist already
  const existingMember = await TripMember
    .query()
    // @ts-ignore
    .findById([trip.$id(), sub])
  if (!!existingMember) {
    // allow for idempotent requests
    return res.sendStatus(204)
  }
  // user has not already been added... add user to trip's members
  const member = await TripMember
    .query()
    .insert({
      // @ts-ignore
      trip_id: trip.$id(),
      user_id: sub,
      // @ts-ignore
      role: invitation.role,
    })
  // increment invitation's claim count
  await invitation
    .$query()
    .increment('claim_count', 1)
  return res.sendStatus(204)
})
