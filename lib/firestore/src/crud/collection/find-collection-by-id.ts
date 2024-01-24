import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export async function findCollectionById(id: string): Promise<Collection | undefined> {
  return pipe(getCollectionsCollectionReference, queryWhere<Collection>('id', '==', id), getQueryUniqueData)()
}
