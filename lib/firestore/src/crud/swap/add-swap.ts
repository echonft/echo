import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findSwapByOfferId } from '@echo/firestore/crud/swap/find-swap-by-offer-id'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export interface AddSwapArgs {
  offerId: string
  transactionId: string
}

export async function addSwap(args: AddSwapArgs): Promise<Swap> {
  const { offerId } = args
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add swap for offer with id ${offerId} but this offer does not exist`)
  }
  const foundSwap = await findSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    throw Error(`trying to add swap for offer with id ${offerId} but a swap already exists for this offer`)
  }
  const newSwap = pipe(getSwapsCollectionReference, setReference<Swap>(assoc('createdAt', now(), args)))()
  // increase the swaps count for receiver and sender items
  const collectionIds = getOfferCollectionIds(offer)
  for (const collectionId of collectionIds) {
    await increaseCollectionSwapsCount(collectionId)
  }
  return newSwap
}
