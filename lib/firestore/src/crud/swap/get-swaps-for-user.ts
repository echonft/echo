import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { Swap } from '@echo/model/types/swap/swap'
import { Filter } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapsForUser(username: string): Promise<Swap[]> {
  return pipe(
    getSwapsCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryOrderBy('slug', 'desc'),
    getQueryData
  )()
}
