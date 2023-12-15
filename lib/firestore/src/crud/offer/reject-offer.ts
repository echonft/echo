import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, pipe } from 'ramda'

export interface RejectOfferArgs {
  offerId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function rejectOffer(args: RejectOfferArgs) {
  return await pipe(assoc<OfferState, 'state'>('state', OFFER_STATE_REJECTED), updateOfferState)(args)
}
