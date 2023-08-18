import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '../../types/model/nft'

export const addNft = async (nft: Omit<Nft, 'id'>): Promise<string> => {
  const reference = firestore().collection(CollectionName.NFTS).doc()
  const id = reference.id
  await reference.set(nftDataConverter.toFirestore({ ...nft, id }))
  return id
}
