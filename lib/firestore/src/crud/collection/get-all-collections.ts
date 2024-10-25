import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { pipe } from 'ramda'

export function getAllCollections(): Promise<CollectionDocument[]> {
  return pipe(collectionsCollection, getQueryData)()
}
