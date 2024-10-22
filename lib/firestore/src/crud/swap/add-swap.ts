import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import type { Swap } from '@echo/model/types/swap/swap'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { assoc, dissoc, isNil, pipe, toLower, toString } from 'ramda'

export async function addSwap(
  args: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'>
): Promise<NewDocument<Swap>> {
  const { offerId } = args
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const foundSwap = await getSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    return Promise.reject(Error(SwapError.Exists))
  }
  const slug = pipe(nowMs, toString, toLower<string>)()
  const data = assoc('slug', slug, args)
  const id = await setReference<Swap, SwapDocumentData>({
    collectionReference: getSwapsCollectionReference(),
    data
  })
  return { id, data: dissoc('offerId', data) }
}
