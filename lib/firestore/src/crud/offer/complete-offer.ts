import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { type Offer } from '@echo/model/types/offer/offer'
import { isNil } from 'ramda'

export interface CompleteOfferArgs extends Pick<Offer, 'slug'> {
  transactionId: string
}

export async function completeOffer(args: CompleteOfferArgs): Promise<Offer> {
  const snapshot = await getOfferSnapshot(args.slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offer = await updateOfferState({ slug: args.slug, state: OfferState.Completed })
  // add swap
  // await addSwap({ offerId: snapshot.id, transactionId: args.transactionId })
  return offer
}
