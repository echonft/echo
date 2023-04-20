import { ItemRequest } from './item-request'
import { TargetRequest } from './target-request'

export interface CreateListingRequest {
  discordGuildId: string
  target: TargetRequest[]
  items: ItemRequest[]
}
