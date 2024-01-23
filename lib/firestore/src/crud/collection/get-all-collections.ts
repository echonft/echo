import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { Collection } from '@echo/model/types/collection'
import { andThen, invoker, pipe } from 'ramda'

export function getAllCollections() {
  return pipe(
    getCollectionsCollectionReference,
    invoker(0, 'get'),
    andThen(getQuerySnapshotDocumentsData<Collection>)
  )()
}
