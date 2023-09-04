import { DiscordUserGuildResponse } from './discord-user-guild-response'

export interface DiscordUserResponse {
  id: string
  username: string
  discriminator: string
  avatar: string | undefined
  banner?: string
  guilds: DiscordUserGuildResponse[]
}
