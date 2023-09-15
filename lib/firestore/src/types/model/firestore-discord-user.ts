import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import type { Dayjs } from 'dayjs'

export interface FirestoreDiscordUser {
  id: string
  userId: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: FirestoreUserDiscordGuild[]
  discordId: string
  discordUsername: string
  updatedAt: Dayjs
}
