import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { pipe } from 'ramda'

export function getUserListingsCount(username: string): Promise<number> {
  return pipe(getListingsCollectionReference, queryWhere('creator.username', '==', username), getQueryCount)()
}
