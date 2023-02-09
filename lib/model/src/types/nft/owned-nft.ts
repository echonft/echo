import { Nft } from './nft'

export interface OwnedNft extends Nft {
  balance: number
}
