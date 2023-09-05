import { Nft } from './nft'

export interface ListingItem {
  amount: number
  nft: Partial<Nft>
}
