import { type Nft } from '@echo/model/types/nft'

export interface ListingItem {
  // we only support ERC721 for now
  // amount: number
  nft: Nft
}
