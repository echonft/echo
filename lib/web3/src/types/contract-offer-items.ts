import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { NonEmptyArray } from 'ramda'

export interface ContractOfferItems {
  readonly chainId: number
  readonly items: NonEmptyArray<ContractOfferItem>
}
