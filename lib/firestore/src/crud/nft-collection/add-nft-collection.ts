import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { firestore } from '../../services/firestore'
import { NftCollection } from '@echo/firestore-types'

export async function addNftCollection(nftCollection: Omit<NftCollection, 'id'>): Promise<string> {
  const reference = firestore().collection(CollectionName.NFT_COLLECTIONS).doc()
  const id = reference.id
  await reference.set(nftCollectionDataConverter.toFirestore({ ...nftCollection, id }))
  return id
}
