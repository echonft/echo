import { type Nft } from '@echo/model/types/nft'

export interface OfferItem {
  // we only support ERC721 for now
  // amount: number
  nft: Nft
}
