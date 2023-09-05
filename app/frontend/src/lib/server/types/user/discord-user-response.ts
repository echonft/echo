import { DiscordUserGuildResponse } from './discord-user-guild-response'

export interface DiscordUserResponse {
  id: string
  username: string
  discriminator: string
  avatar?: string
  banner?: string
  guilds: DiscordUserGuildResponse[]
}
