import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Collection } from '@echo/model/types/collection/collection'
import { pipe } from 'ramda'

export function getCollections(): Promise<Collection[]> {
  return pipe(getCollectionsCollectionReference, getQueryData)()
}
