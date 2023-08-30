import { Wallet } from './wallet'
import { Dayjs } from 'dayjs'

export interface AuthUser {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: {
    discordId: string
  }[]
  discordId: string
  discordUsername: string
  nonce: string | undefined
  updatedAt: Dayjs | undefined
  wallets: Wallet[]
}
