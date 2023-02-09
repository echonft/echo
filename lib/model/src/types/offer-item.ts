import { Contract } from './contract'
import { BigNumber } from 'ethers'

export interface OfferItem {
  id: string
  contract: Contract
  tokenId: BigNumber
}
