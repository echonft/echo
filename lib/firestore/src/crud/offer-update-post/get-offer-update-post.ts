import { offerUpdatePostsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferUpdatePostDocument } from '@echo/firestore/types/model/offer-update-post-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getOfferUpdatePost(args: OfferUpdatePostDocument): Promise<Nullable<OfferUpdatePostDocument>> {
  return pipe(
    offerUpdatePostsCollection,
    queryWhere('offerId', '==', args.offerId),
    queryWhere('state', '==', args.state),
    getQueryUniqueData
  )()
}
