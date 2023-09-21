import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection-data-converter'
import { getNftCollectionSnapshotById } from '@echo/firestore/crud/nft-collection/get-nft-collection-snapshot-by-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function updateNftCollection(
  id: string,
  nftCollection: Partial<Omit<FirestoreNftCollection, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft-collection id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, nftCollection, nftCollectionDataConverter)
}
