import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { type Nft } from '@echo/model/types/nft'
import { WriteResult } from 'firebase-admin/firestore'

export async function unchecked_updateNft(nftId: string, updateData: Partial<Omit<Nft, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(nftId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
