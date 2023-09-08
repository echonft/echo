import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '@echo/firestore-types'

export async function addNft(nft: Omit<Nft, 'id'>): Promise<string> {
  const reference = firestore().collection(CollectionName.NFTS).doc()
  const id = reference.id
  await reference.set(nftDataConverter.toFirestore({ ...nft, id }))
  return id
}
