import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { Listing } from '@echo/model/types/listing'
import { andThen, pipe } from 'ramda'

export function getAllListings(): Promise<Listing[]> {
  return pipe(getListingsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
