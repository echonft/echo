import { Contract } from './contract'

export interface DiscordGuild {
  id: string
  discordId: string
  channelId: string
  contracts: Contract[]
  name: string
}
