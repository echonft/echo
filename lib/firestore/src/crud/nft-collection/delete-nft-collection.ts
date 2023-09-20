import { getNftCollectionSnapshotById } from '@echo/firestore/crud/nft-collection/get-nft-collection-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteNftCollection(id: string): Promise<WriteResult> {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft-collection id')
  }
  return documentSnapshot.ref.delete()
}
