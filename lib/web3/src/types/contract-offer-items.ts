import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'

export interface ContractOfferItems {
  readonly chainId: number
  readonly items: readonly ContractOfferItem[]
}
