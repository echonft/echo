import { updateOfferState, type UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { assoc, pipe } from 'ramda'

export function rejectOffer(args: Omit<UpdateOfferStateArgs, 'state'>): Promise<Offer> {
  return pipe(assoc<OfferState, 'state'>('state', OfferState.Rejected), updateOfferState)(args)
}
