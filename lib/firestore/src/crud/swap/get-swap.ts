import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export async function getSwap(slug: Lowercase<string>): Promise<Nullable<SwapDocument>> {
  return pipe(swapsCollection, queryWhere('slug', '==', slug), getQueryUniqueData)()
}
