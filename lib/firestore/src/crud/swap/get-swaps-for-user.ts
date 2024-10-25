import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { Username } from '@echo/model/types/username'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapsForUserQuery(username: Username): Query<SwapDocument> {
  return pipe(
    swapsCollection,
    queryWhereFilter(
      Filter.or(Filter.where('sender.username', '==', username), Filter.where('receiver.username', '==', username))
    ),
    queryOrderBy('slug', 'desc')
  )()
}

export function getSwapsForUser(username: Username): Promise<SwapDocument[]> {
  return pipe(getSwapsForUserQuery, getQueryData)(username)
}
