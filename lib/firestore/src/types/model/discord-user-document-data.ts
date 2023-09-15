import type { UserDiscordGuildDocumentData } from '@echo/firestore/types/model/user-discord-guild-document-data'

export interface DiscordUserDocumentData {
  id: string
  userId: string
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: UserDiscordGuildDocumentData[]
  discordId: string
  discordUsername: string
  updatedAt: number
}

export const discordUserFields = [
  'id',
  'userId',
  'discordAvatar',
  'discordBanner',
  'discordGuilds',
  'discordId',
  'discordUsername',
  'updatedAt'
]
