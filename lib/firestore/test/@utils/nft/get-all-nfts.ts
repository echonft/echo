import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { Nft } from '@echo/model/types/nft'
import { andThen, pipe } from 'ramda'

export function getAllNfts(): Promise<Nft[]> {
  return pipe(getNftsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
