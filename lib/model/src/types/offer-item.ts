import { Contract } from './contract'

export interface OfferItem {
  contract: Contract
  tokenId: bigint
  balance: number | undefined
}
