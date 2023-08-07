import { TargetRequest } from './target-request'

export interface CreateDiscordRequest {
  channelId: number
  discordId: number
  name: string
  contracts: TargetRequest[]
}
