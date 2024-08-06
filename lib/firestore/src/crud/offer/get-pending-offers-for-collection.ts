import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { juxt, pipe } from 'ramda'

export async function getPendingOffersForCollection(slug: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryOrderBy<Offer>('expiresAt', 'desc'),
    juxt([
      queryWhere<Offer>('receiverItemCollections', 'array-contains', slug),
      queryWhere<Offer>('senderItemCollections', 'array-contains', slug)
    ]),
    getQueriesDocuments
  )()
}
