import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addSwap(offerId: string, txId: string): Promise<Swap> {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add swap for offer with id ${offerId} but this offer does not exist`)
  }
  const foundSwap = await findSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    throw Error(`trying to add swap for offer with id ${offerId} but a swap already exists for this offer`)
  }
  const reference = getSwapsCollectionReference().doc()
  const id = reference.id
  const newSwap: Swap = { id, offerId, txId, date: dayjs().unix() }
  await reference.set(newSwap)
  // increase the swaps count for receiver and sender items
  const collectionIds = getOfferCollectionIds(offer)
  for (const collectionId of collectionIds) {
    await increaseCollectionSwapsCount(collectionId)
  }
  return newSwap
}
