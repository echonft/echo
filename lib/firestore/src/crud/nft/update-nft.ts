import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { assoc } from 'ramda'

export async function updateNft(
  nftId: string,
  updateData: Partial<Omit<FirestoreNft, 'id' | 'updatedAt'>>
): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(nftId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(assoc('updatedAt', dayjs().unix(), updateData))
}
