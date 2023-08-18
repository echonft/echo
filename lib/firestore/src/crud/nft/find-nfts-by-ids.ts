import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { Nft } from '../../types/model/nft'
import { firestore } from 'firebase-admin'
import { map } from 'ramda'

export const findNftsByIds = async (ids: string[]) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('id', 'in', ids)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map((snapshot) => snapshot.data(), querySnapshot.docs)
}
