import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '../../types/model/nft'
import { invoker, map } from 'ramda'

export const getAllNfts = async () => {
  const querySnapshot = await firestore().collection(CollectionName.NFTS).withConverter(nftDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
