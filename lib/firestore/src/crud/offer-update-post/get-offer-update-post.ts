import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdatePostDocumentData } from '@echo/firestore/types/model/offer-update-post-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getOfferUpdatePost(args: OfferUpdatePostDocumentData): Promise<Nullable<OfferUpdatePostDocumentData>> {
  return pipe(
    getOfferUpdatePostsCollectionReference,
    queryWhere('offerId', '==', args.offerId),
    queryWhere('state', '==', args.state),
    getQueryUniqueData
  )()
}
