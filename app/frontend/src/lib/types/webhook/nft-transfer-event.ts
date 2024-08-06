import type { Wallet } from '@echo/model/types/wallet'

export interface NftTransferEvent {
  contract: Wallet
  from: Wallet
  to: Wallet
  tokenId: number
}
