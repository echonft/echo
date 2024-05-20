import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'

export interface ContractOfferItems {
  chainId: number
  items: ContractOfferItem[]
}
