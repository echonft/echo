import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { type WriteResult } from 'firebase-admin/firestore'
import { assoc } from 'ramda'

export async function updateNft(
  nftId: string,
  updateData: Partial<Omit<Nft, 'id' | 'updatedAt'>>
): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(nftId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(assoc('updatedAt', now(), updateData))
}
