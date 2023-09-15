import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteNft(id: string): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft id')
  }
  return documentSnapshot.ref.delete()
}
