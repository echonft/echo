import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { firestore } from '../../services/firestore'
import { NftCollection } from '../../types/model/nft-collection'
import { invoker, map } from 'ramda'

export const getAllNftCollections = async () => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .withConverter(nftCollectionDataConverter)
    .get()
  return map(invoker(0, 'data'), querySnapshot.docs) as NftCollection[]
}
