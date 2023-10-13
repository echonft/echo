import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function uncheckedUpdateNft(
  nftId: string,
  updateData: Partial<Omit<FirestoreNft, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(nftId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
