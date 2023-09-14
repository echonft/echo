import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import type { Dayjs } from 'dayjs'

export interface FirestoreUser {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: FirestoreUserDiscordGuild[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: Dayjs
  nonce?: string
  updatedAt: Dayjs
  username: string
  wallets: FirestoreWallet[]
}
