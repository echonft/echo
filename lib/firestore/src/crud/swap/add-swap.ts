import { addSwapArrayIndexers } from '@echo/firestore/array-indexers/swap/add-swap-array-indexers'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import { type SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import type { Swap } from '@echo/model/types/swap'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { assoc, dissoc, isNil, pipe } from 'ramda'

export async function addSwap(
  args: Pick<SwapDocument, 'offerId' | 'receiver' | 'receiverItems' | 'sender' | 'senderItems' | 'transactionId'>
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
  const data = pipe<
    [
      Omit<
        SwapDocument,
        'slug' | 'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
      >
    ],
    Omit<
      SwapDocument,
      'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
    >,
    SwapDocument
  >(
    assoc('slug', nowMsSlug()),
    addSwapArrayIndexers
  )(args)
  const id = await setReference({
    collectionReference: swapsCollection(),
    data
  })
  return { id, data: dissoc('offerId', data) }
}
