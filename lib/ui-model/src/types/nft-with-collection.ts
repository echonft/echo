import { Nft } from './nft'
import { NftCollection } from './nft-collection'

export interface NftWithCollection extends Omit<Nft, 'collectionId'> {
  collection: NftCollection
}
