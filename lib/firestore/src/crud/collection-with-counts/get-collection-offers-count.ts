import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getCollectionOffersCount(collectionSlug: string): Promise<number> {
  return pipe(
    getOffersCollectionReference,
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', collectionSlug),
        Filter.where('senderItemCollections', 'array-contains', collectionSlug)
      )
    ),
    getQueryCount
  )()
}
