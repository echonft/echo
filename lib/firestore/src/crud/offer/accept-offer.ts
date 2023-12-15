import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { addOfferSignature } from '@echo/firestore/crud/offer-signature/add-offer-signature'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import type { OfferState } from '@echo/model/types/offer-state'
import type { HexString } from '@echo/utils/types/hex-string'
import { assoc, omit, pipe } from 'ramda'

export interface AcceptOfferArgs {
  offerId: string
  userId: string
  signature: HexString
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function acceptOffer(args: AcceptOfferArgs) {
  const offer = await pipe<
    [AcceptOfferArgs],
    Omit<AcceptOfferArgs, 'userId' | 'signature'>,
    Omit<AcceptOfferArgs, 'userId' | 'signature'> & Record<'state', OfferState>,
    Promise<Offer>
  >(
    omit(['userId', 'signature']),
    assoc('state', OFFER_STATE_ACCEPTED),
    updateOfferState
  )(args)
  await pipe<[AcceptOfferArgs], Omit<AcceptOfferArgs, 'updateArgs'>, Promise<OfferSignature>>(
    omit(['updateArgs']),
    addOfferSignature
  )(args)
  return offer
}
