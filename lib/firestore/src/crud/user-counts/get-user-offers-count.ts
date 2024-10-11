import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryCount } from '@echo/firestore/helpers/crud/query/get-query-count'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getUserOffersCount(username: string): Promise<number> {
  return pipe(
    getOffersCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('receiver.username', '==', username), Filter.where('sender.username', '==', username))
    ),
    getQueryCount
  )()
}
