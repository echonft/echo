export interface DiscordUserDocumentData {
  id: string
  userId: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  updatedAt: number
}

export const discordUserFields = [
  'id',
  'userId',
  'discordAvatar',
  'discordBanner',
  'discordId',
  'discordUsername',
  'updatedAt'
]
