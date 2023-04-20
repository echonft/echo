import { ItemRequest } from './item-request'
import { TargetRequest } from './target-request'

export interface CreateListingRequest {
  discordGuild: string
  target: TargetRequest[]
  items: ItemRequest[]
}
