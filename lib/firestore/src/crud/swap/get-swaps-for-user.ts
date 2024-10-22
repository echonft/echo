import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap/swap'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapsForUserQuery(username: string): Query<Swap, SwapDocumentData> {
  return pipe(
    getSwapsCollectionReference,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryOrderBy('slug', 'desc')
  )()
}

export function getSwapsForUser(username: string): Promise<Swap[]> {
  return pipe(getSwapsForUserQuery, getQueryData)(username)
}
