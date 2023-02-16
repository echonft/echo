import { Wallet } from './wallet'

export interface User {
  id: string
  discordId: string
  wallets?: Wallet[]
}
