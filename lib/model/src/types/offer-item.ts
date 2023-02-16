import { Contract } from './contract'
import { BigNumber } from 'ethers'

export interface OfferItem {
  contract: Contract
  tokenId: BigNumber
  balance: number | undefined
}
