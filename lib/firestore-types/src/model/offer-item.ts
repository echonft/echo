import { Nft } from './nft'

export interface OfferItem {
  amount: number
  nft: Partial<Nft>
}
