export interface DiscordUser {
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: { discordId: string }[]
  discordId: string
  discordUsername: string
}
