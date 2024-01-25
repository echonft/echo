import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferStateUpdate } from '@echo/firestore/types/model/offer-update/offer-state-update'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { now } from '@echo/utils/helpers/now'
import { isNil, pipe } from 'ramda'

export interface AddOfferStateUpdateArgs {
  offerId: string
  args: OfferStateUpdateArgs
}
export async function addOfferStateUpdate(args: AddOfferStateUpdateArgs): Promise<OfferStateUpdate> {
  const { offerId } = args
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add a state update for offer with id ${offerId} but this offer does not exist`)
  }
  const {
    args: { state }
  } = args
  const offerStateUpdate = await findOfferStateUpdate(offerId, state)
  if (!isNil(offerStateUpdate)) {
    throw Error(`trying to add a state update to ${state} for offer with id ${offerId} but this update already exists`)
  }
  return pipe(
    getOfferUpdatesCollectionReference<OfferStateUpdate>,
    setReference<OfferStateUpdate>({
      offerId,
      update: { kind: OFFER_UPDATE_KIND_STATE, args: args.args },
      createdAt: now()
    })
  )()
}
