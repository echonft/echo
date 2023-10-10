import { getNftCollectionSnapshotById } from '@echo/firestore/crud/nft-collection/get-nft-collection-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function updateNftCollection(
  nftCollectionId: string,
  updateData: Partial<Omit<FirestoreNftCollection, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getNftCollectionSnapshotById(nftCollectionId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
