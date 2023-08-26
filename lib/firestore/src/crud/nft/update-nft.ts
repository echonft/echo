import { nftDataConverter } from '../../converters/nft-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { Nft } from '../../types/model/nft'
import { getNftSnapshotById } from './get-nft-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateNft = async (id: string, nft: Partial<Omit<Nft, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getNftSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, nft, nftDataConverter)
}
