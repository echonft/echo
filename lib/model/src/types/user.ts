import { Wallet } from './wallet'

export interface User {
  id: string
  discordId: string
  nonce: string | undefined
  wallets: Wallet[] | undefined
}
