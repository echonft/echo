import type { Address } from '@echo/model/types/address'

export interface Erc721TransferEvent {
  contract: Address
  from: Address
  to: Address
  tokenId: number
}
