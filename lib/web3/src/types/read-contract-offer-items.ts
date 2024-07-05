import type { ReadContractOfferItem } from '@echo/web3/types/read-contract-offer-item'

export interface ReadContractOfferItems {
  readonly chainId: bigint
  readonly items: Readonly<ReadContractOfferItem[]>
}
