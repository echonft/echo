import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhereFilter } from '@echo/firestore/helpers/crud/query/query-where-filter'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Slug } from '@echo/model/types/slug'
import type { Swap } from '@echo/model/types/swap/swap'
import { Filter, type Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getSwapsForCollectionQuery(slug: Slug): Query<Swap, SwapDocumentData> {
  return pipe(
    getSwapsCollectionReference,
    queryOrderBy('slug', 'desc'),
    queryWhereFilter(
      Filter.or(
        Filter.where('receiverItemCollections', 'array-contains', slug),
        Filter.where('senderItemCollections', 'array-contains', slug)
      )
    )
  )()
}

export async function getSwapsForCollection(slug: Slug): Promise<Swap[]> {
  return pipe(getSwapsForCollectionQuery, getQueryData)(slug)
}
