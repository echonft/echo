import { Contract } from './contract'

export interface DiscordGuild {
  discordId: string
  channelId: string
  contracts: Contract[]
  name: string
}
