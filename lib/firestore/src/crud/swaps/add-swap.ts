import { increaseNftCollectionSwapsCount } from '@echo/firestore/crud/nft-collection-swaps-count/increase-nft-collection-swaps-count'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { getSwapsCollection } from '@echo/firestore/helpers/collection/get-swaps-collection'
import { getOfferCollectionIds } from '@echo/firestore/helpers/offer/get-offer-collection-ids'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
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
  const reference = getSwapsCollection().doc()
  const id = reference.id
  const newSwap: Swap = { id, offerId, txId, date: dayjs().unix() }
  await reference.set(newSwap)
  // increase the swaps count for receiver and sender items
  const collectionIds = getOfferCollectionIds(offer)
  for (const collectionId of collectionIds) {
    await increaseNftCollectionSwapsCount(collectionId)
  }
  return newSwap
}
