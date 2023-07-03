import { TargetRequest } from './target-request'

export interface CreateDiscordRequest {
  channelId: string
  discordId: string
  name: string
  contracts: TargetRequest[]
}
