import { updateOfferState, type UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, pipe } from 'ramda'

export function acceptOffer(args: Omit<UpdateOfferStateArgs, 'state'>): Promise<Offer> {
  return pipe(assoc<OfferState, 'state'>('state', OFFER_STATE_ACCEPTED), updateOfferState)(args)
}
