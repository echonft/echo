import { AlchemyNftContract } from './alchemy-nft-contract'
import { NftCollection } from '@echo/model'

export interface AlchemyNftCollection extends Omit<NftCollection, 'id' | 'contract'> {
  contract: AlchemyNftContract
}
