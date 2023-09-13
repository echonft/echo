import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateNft(id: string, nft: Partial<Omit<FirestoreNft, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getNftSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, nft, nftDataConverter)
}
