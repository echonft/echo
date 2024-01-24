import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { andThen, pipe } from 'ramda'

export function getAllSwaps(): Promise<Swap[]> {
  return pipe(getSwapsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
