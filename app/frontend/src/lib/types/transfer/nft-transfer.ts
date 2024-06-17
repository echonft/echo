import type { Wallet } from '@echo/model/types/wallet'

export interface NftTransfer {
  contract: Wallet
  from: Wallet
  to: Wallet
  tokenId: number
}
