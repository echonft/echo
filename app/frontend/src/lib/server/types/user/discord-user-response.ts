import type { DiscordUserGuildResponse } from '@server/types/user/discord-user-guild-response'

export interface DiscordUserResponse {
  id: string
  username: string
  discriminator: string
  avatar?: string
  banner?: string
  guilds: DiscordUserGuildResponse[]
}
