import { getNftCollectionSnapshotById } from './get-nft-collection-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const deleteNftCollection = async (id: string): Promise<WriteResult> => {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  return documentSnapshot.ref.delete()
}
