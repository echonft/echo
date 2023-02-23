import { Wallet } from './wallet'

export interface User {
  id: string
  discordId: string | undefined
  nonce: string
  wallets: Wallet[] | undefined
}
