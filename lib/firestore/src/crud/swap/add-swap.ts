import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Swap } from '@echo/firestore/types/model/swap/swap'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export async function addSwap(args: Omit<Swap, 'createdAt'>): Promise<NewDocument<Swap>> {
  const { offerId } = args
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add swap for offer with id ${offerId} but this offer does not exist`)
  }
  const foundSwap = await getSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    throw Error(`trying to add swap for offer with id ${offerId} but a swap already exists for this offer`)
  }
  const data = assoc('createdAt', now(), args)
  const id = await setReference<Swap>({
    collectionReference: getSwapsCollectionReference(),
    data
  })
  // increase the swaps count for receiver and sender items
  const collectionSlugs = pipe(getOfferItems, getNftsCollectionSlugs)(offer)
  for (const slug of collectionSlugs) {
    await increaseCollectionSwapsCount(slug)
  }
  return { id, data }
}
