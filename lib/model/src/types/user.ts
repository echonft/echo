import { type Wallet } from '@echo/model/types/wallet'

export interface User {
  discord: {
    avatarUrl: string
    username: string
  }
  username: string
  wallet: Wallet
}
