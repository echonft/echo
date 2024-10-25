import type { Wallet } from '@echo/model/types/wallet'

export interface WalletDocument extends Wallet {
  userId: string
}
