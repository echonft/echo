import type { Dayjs } from 'dayjs'

export interface FirestoreDiscordUser {
  id: string
  userId: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  updatedAt: Dayjs
}
