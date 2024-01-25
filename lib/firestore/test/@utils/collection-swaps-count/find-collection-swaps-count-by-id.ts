import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { pipe } from 'ramda'

export function findCollectionSwapsCountById(id: string): Promise<CollectionSwapsCount | undefined> {
  return pipe(getCollectionSwapsCountCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
