import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { juxt, pipe } from 'ramda'

export async function getCompletedOffersForCollection(slug: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere<Offer>('state', '==', OFFER_STATE_COMPLETED),
    queryOrderBy<Offer>('updatedAt', 'desc'),
    juxt([
      queryWhere<Offer>('receiverItemCollections', 'array-contains', slug),
      queryWhere<Offer>('senderItemCollections', 'array-contains', slug)
    ]),
    getQueriesDocuments
  )()
}
