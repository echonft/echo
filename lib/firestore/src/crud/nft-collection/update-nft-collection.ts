import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { getNftCollectionSnapshotById } from './get-nft-collection-snapshot-by-id'
import { NftCollection } from '@echo/firestore-types'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateNftCollection = async (
  id: string,
  nftCollection: Partial<Omit<NftCollection, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft-collection id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, nftCollection, nftCollectionDataConverter)
}
