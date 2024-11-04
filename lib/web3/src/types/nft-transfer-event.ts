import type { Address } from '@echo/model/types/address'

export interface NftTransferEvent {
  contract: Address
  from: Address
  to: Address
  tokenId: number
}
