import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { pipe } from 'ramda'

export function getCollectionListingsCount(collectionSlug: string): Promise<number> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('target.collection.slug', '==', collectionSlug),
    getQueryCount
  )()
}
