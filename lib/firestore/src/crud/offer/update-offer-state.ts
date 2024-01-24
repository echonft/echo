import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { assertOfferStateUpdateArgs } from '@echo/firestore/helpers/offer/assert/assert-offer-state-update-args'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import type { Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { now } from '@echo/utils/helpers/now'
import { always, assoc, pick, pipe } from 'ramda'

export async function updateOfferState(args: {
  offerId: string
  state: OfferState
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}): Promise<Offer> {
  const { offerId, state, updateArgs } = args
  const offer = await findOfferById(offerId)
  assertOfferStateTransition(offer, state)
  const completeUpdateArgs: OfferStateUpdateArgs = assoc('state', state, updateArgs)
  assertOfferStateUpdateArgs(offer, completeUpdateArgs)
  await addOfferStateUpdate({ offerId, args: completeUpdateArgs })
  const updatedOffer: Offer = pipe<[Offer], Offer, Offer>(assoc('state', state), assoc('updatedAt', now()))(offer)
  return pipe(
    getOffersCollectionReference,
    updateReference(offerId, pick(['state', 'updatedAt'], updatedOffer)),
    always(updatedOffer)
  )()
}
