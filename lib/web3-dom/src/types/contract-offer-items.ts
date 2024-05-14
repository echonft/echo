import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'

export interface ContractOfferItems {
  chainId: bigint
  items: ContractOfferItem[]
}
