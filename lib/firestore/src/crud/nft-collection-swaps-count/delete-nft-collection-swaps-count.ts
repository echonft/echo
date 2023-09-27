import { getNftCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteNftCollectionSwapsCount(id: string): Promise<WriteResult> {
  const documentSnapshot = await getNftCollectionSwapsCountSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`nft collection swaps count with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
