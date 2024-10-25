import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Slug } from '@echo/model/types/slug'
import type { Swap } from '@echo/model/types/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export async function getSwap(slug: Slug): Promise<Nullable<Swap>> {
  return pipe(getSwapsCollectionReference, queryWhere('slug', '==', slug), getQueryUniqueData)()
}
