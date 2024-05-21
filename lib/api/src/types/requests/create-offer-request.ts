import type { ItemRequest } from '@echo/api/types/requests/item-request'

export interface CreateOfferRequest {
  receiverItems: ItemRequest[]
  senderItems: ItemRequest[]
  expiresAt: number
}
