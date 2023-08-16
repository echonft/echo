import { Wallet } from './wallet'
import { Dayjs } from 'dayjs'

export interface User {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuildsIds: string[]
  discordId: string
  discordUsername: string
  updatedAt: Dayjs | undefined
  wallets: Wallet[]
}
