import { nftDataConverter } from '../../converters/nft-data-converter'
import { Nft } from '../../types/model/nft'
import { getNftSnapshotById } from './get-nft-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateNft = async (id: string, nft: Omit<Nft, 'id'> | Partial<Omit<Nft, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getNftSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid nft id')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(nftDataConverter.toFirestore(nft))
}
