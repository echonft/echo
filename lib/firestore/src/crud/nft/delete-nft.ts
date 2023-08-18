import { getNftSnapshotById } from './get-nft-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const deleteNft = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getNftSnapshotById(id)
  return documentSnapshot.ref.delete()
}
