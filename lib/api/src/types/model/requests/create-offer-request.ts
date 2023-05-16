import { ItemRequest } from './item-request'

export interface CreateOfferRequest {
  receiverItems: ItemRequest[]
  senderItems: ItemRequest[]
  requestForOfferId?: string
}
