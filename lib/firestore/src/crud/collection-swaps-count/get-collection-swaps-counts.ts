import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import { isNil } from 'ramda'

export async function getCollectionSwapsCounts(limit?: number) {
  const query = getCollectionSwapsCountCollectionReference().orderBy('swapsCount', 'desc')
  const snapshot = isNil(limit) ? await query.get() : await query.limit(limit).get()
  return getQuerySnapshotData(snapshot)
}
