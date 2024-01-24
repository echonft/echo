import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { WriteResult } from 'firebase-admin/firestore'
import { assoc } from 'ramda'

export async function updateNft(
  nftId: string,
  updateData: Partial<Omit<Nft, 'id' | 'updatedAt'>>
): Promise<WriteResult> {
  const snapshot = await getNftSnapshotById(nftId)
  // assertQueryDocumentSnapshot(snapshot)
  return await snapshot!.ref.update(assoc('updatedAt', now(), updateData))
}
