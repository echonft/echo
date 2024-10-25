import type { Contract } from '@echo/model/types/contract'

export interface NftTransferEvent {
  contract: Contract
  from: Contract
  to: Contract
  tokenId: number
}
