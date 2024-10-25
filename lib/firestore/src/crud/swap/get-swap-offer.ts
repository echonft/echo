import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, pipe } from 'ramda'

export async function getSwapOffer(slug: Slug): Promise<Nullable<Offer>> {
  const swap: Nullable<SwapDocument> = await pipe(
    swapsCollection,
    queryWhere<SwapDocument>('slug', '==', slug),
    getQueryUniqueData
  )()
  if (isNil(swap)) {
    return Promise.reject(Error(SwapError.NotFound))
  }
  return getOfferById(swap.offerId)
}
