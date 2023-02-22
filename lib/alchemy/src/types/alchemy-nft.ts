import { AlchemyNftCollection } from './alchemy-nft-collection'
import { Nft } from '@echo/model'

export interface AlchemyNft extends Omit<Nft, 'collection'> {
  collection: AlchemyNftCollection
}
