import { TargetRequest } from './target-request'

export interface CreateRequestForOfferRequest {
  discordGuildId: string
  target: TargetRequest[]
  items: string[]
}
