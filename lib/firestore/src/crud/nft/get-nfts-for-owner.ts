import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '../../types/model/nft'
import { invoker, map } from 'ramda'

export const getNftsForOwner = async (userId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('owner.id', '==', userId)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
