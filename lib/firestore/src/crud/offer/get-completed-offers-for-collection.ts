import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function getCompletedOffersForCollection(slug: string): Promise<Offer[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', '==', OFFER_STATE_COMPLETED),
    queryOrderBy('expiresAt', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    ),
    getQueryData
  )()
}
