export interface UserDiscordGuildDocumentData {
  id: string
  userId: string
  guilds: { discordId: string }[]
  updatedAt: number
}
