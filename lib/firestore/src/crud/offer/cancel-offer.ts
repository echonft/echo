import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, pipe } from 'ramda'

export interface CancelOfferArgs {
  offerId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function cancelOffer(args: CancelOfferArgs) {
  return await pipe(assoc<OfferState, 'state'>('state', 'CANCELLED'), updateOfferState)(args)
}
