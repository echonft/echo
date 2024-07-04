import type { EvmAddress } from '@echo/model/types/evm-address'

export interface ContractOfferItem {
  readonly tokenAddress: EvmAddress
  readonly tokenId: number
}
