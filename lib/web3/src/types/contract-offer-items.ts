import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'

export interface ContractOfferItems {
  chainId: number
  items: ContractOfferItem[]
}
