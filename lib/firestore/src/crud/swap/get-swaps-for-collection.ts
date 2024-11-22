import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/query/query-where-filter'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapsForCollectionQuery(slug: Lowercase<string>): Query<SwapDocument> {
  return pipe(
    swapsCollection,
    queryOrderBy('slug', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    )
  )()
}

export async function getSwapsForCollection(slug: Lowercase<string>): Promise<SwapDocument[]> {
  return pipe(getSwapsForCollectionQuery, getQueryData)(slug)
}
