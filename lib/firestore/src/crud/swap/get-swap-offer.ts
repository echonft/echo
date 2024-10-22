import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import type { CollectionReference } from 'firebase-admin/firestore'
import { isNil, pipe } from 'ramda'

export async function getSwapOffer(slug: Slug): Promise<Nullable<Offer>> {
  const swap: Nullable<SwapDocumentData> = await pipe(
    queryWhere<SwapDocumentData, SwapDocumentData>('slug', '==', slug),
    getQueryUniqueData
  )(firestoreApp().collection(CollectionReferenceName.Swaps) as CollectionReference<SwapDocumentData, SwapDocumentData>)
  if (isNil(swap)) {
    return Promise.reject(Error(SwapError.NotFound))
  }
  return getOfferById(swap.offerId)
}
