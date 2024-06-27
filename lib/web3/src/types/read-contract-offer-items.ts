import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'

export interface ReadContractOfferItems {
  chainId: bigint
  items: ReadContractOfferItem[]
}
