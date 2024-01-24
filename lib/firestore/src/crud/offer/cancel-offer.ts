import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, pipe } from 'ramda'

export interface CancelOfferArgs {
  offerId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export function cancelOffer(args: CancelOfferArgs) {
  return pipe(assoc<OfferState, 'state'>('state', OFFER_STATE_CANCELLED), updateOfferState)(args)
}
