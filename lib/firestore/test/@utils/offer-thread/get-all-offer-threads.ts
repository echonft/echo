import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { andThen, pipe } from 'ramda'

export function getAllOfferThreads(): Promise<OfferThread[]> {
  return pipe(getOfferThreadsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
