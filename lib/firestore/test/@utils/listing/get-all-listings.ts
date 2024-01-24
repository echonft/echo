import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import type { Listing } from '@echo/model/types/listing'
import { andThen, pipe } from 'ramda'

export function getAllListings() {
  return pipe(getListingsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotDocumentsData<Listing>))()
}
