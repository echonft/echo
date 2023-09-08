import { getNftSnapshotById } from './get-nft-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteNft(id: string): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft id')
  }
  return documentSnapshot.ref.delete()
}
