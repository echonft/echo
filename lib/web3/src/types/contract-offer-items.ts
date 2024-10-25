import type { ChainId } from '@echo/model/types/chain'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { NonEmptyArray } from 'ramda'

export interface ContractOfferItems {
  readonly chainId: ChainId
  readonly items: NonEmptyArray<ContractOfferItem>
}
