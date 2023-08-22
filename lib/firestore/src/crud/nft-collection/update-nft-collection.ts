import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { NftCollection } from '../../types/model/nft-collection'
import { getNftCollectionSnapshotById } from './get-nft-collection-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateNftCollection = async (
  id: string,
  nftCollection: Omit<NftCollection, 'id'> | Partial<Omit<NftCollection, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft-collection id')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(nftCollectionDataConverter.toFirestore(nftCollection))
}
