import { AlchemyNftCollection } from './alchemy-nft-collection'
import { OwnedNft } from '@echo/model'

export interface AlchemyOwnedNft extends Omit<OwnedNft, 'collection' | 'owner'> {
  collection: AlchemyNftCollection
}
