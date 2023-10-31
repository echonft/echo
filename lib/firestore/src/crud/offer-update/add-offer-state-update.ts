import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import type { OfferStateUpdate } from '@echo/firestore/types/model/offer-update/offer-state-update'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addOfferStateUpdate(offerId: string) {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add a state update for offer with id ${offerId} but this offer does not exist`)
  }
  const { state } = offer
  const offerStateUpdate = await findOfferStateUpdate(offerId, state)
  if (!isNil(offerStateUpdate)) {
    throw Error(`trying to add a state update to ${state} for offer with id ${offerId} but this update already exists`)
  }
  const reference = getOfferUpdatesCollectionReference().doc()
  const id = reference.id
  const newOfferStateUpdate: OfferStateUpdate = {
    id,
    offerId,
    update: { kind: 'state', args: { state } },
    postedAt: now()
  }
  await reference.set(newOfferStateUpdate)
  return newOfferStateUpdate
}
