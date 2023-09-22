import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDocumentDataConverter } from '@echo/firestore/converters/swap/swap-document-data-converter'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addSwap(offerId: string, txId: string): Promise<FirestoreSwap> {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add swap for offer with id ${offerId} but this offer does not exist`)
  }
  const foundSwap = await findSwapByOfferId(offerId)
  if (!isNil(foundSwap)) {
    throw Error(`trying to add swap for offer with id ${offerId} but a swap already exists for this offer`)
  }

  const reference = firestoreApp().collection(CollectionName.SWAPS).doc()
  const id = reference.id
  const newSwap: SwapDocumentData = { id, offerId, txId, date: dayjs().unix() }
  await reference.set(newSwap)
  return swapDocumentDataConverter.fromFirestore(newSwap)
}
