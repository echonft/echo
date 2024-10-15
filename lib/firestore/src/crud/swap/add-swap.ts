import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getOfferItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-items-collection-slugs'
import { isNil } from 'ramda'

export async function addSwap(swap: SwapDocumentData): Promise<NewDocument<SwapDocumentData>> {
  const { offerId } = swap
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(`trying to add swap for offer with id ${offerId} but this offer does not exist`))
  }
  const foundSwap = await getSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    return Promise.reject(
      Error(`trying to add swap for offer with id ${offerId} but a swap already exists for this offer`)
    )
  }
  const id = await setReference<SwapDocumentData, SwapDocumentData>({
    collectionReference: getSwapsCollectionReference(),
    data: swap
  })
  // increase the swaps count for receiver and sender items
  const collectionSlugs = getOfferItemsCollectionSlugs(offer)
  for (const slug of collectionSlugs) {
    await increaseCollectionSwapsCount(slug)
  }
  return { id, data: swap }
}
