import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getOfferUpdatePost(offerUpdateId: string): Promise<Nullable<OfferUpdatePost>> {
  return pipe(
    getOfferUpdatePostsCollectionReference,
    queryWhere<OfferUpdatePost>('offerUpdateId', '==', offerUpdateId),
    getQueryUniqueData
  )()
}
