import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export function getAllCollections(): Promise<Collection[]> {
  return pipe(getCollectionsCollectionReference, getQueryData)()
}
