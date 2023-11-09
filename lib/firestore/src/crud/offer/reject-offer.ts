import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, pipe } from 'ramda'

export interface RejectOfferArgs {
  offerId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function rejectOffer(args: RejectOfferArgs) {
  return await pipe(assoc<OfferState, 'state'>('state', 'REJECTED'), updateOfferState)(args)
}
