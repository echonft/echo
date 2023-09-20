import { Dayjs } from 'dayjs'

export interface FirestoreUserDiscordGuild {
  id: string
  userId: string
  guilds: { discordId: string }[]
  updatedAt: Dayjs
}
