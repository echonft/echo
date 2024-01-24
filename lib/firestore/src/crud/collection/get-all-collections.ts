import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { Collection } from '@echo/model/types/collection'
import { andThen, pipe } from 'ramda'

export function getAllCollections() {
  return pipe(getCollectionsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotDocumentsData<Collection>))()
}
