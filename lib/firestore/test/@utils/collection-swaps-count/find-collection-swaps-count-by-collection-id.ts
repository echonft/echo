import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findCollectionSwapsCountByCollectionId(collectionId: string): Promise<Nullable<CollectionSwapsCount>> {
  return pipe(
    getCollectionSwapsCountCollectionReference,
    queryWhere('collectionId', '==', collectionId),
    getQueryUniqueData
  )()
}
