import { ItemRequest } from './item-request'

export interface CreateOfferWithRequestForOfferRequest {
  receiverItems: ItemRequest[]
  senderItems: ItemRequest[]
  requestForOfferId: string
  withRequestForOffer: true
}

export interface CreateOfferWithoutRequestForOfferRequest {
  receiverItems: ItemRequest[]
  senderItems: ItemRequest[]
  receiverId: string
  discordGuildId: string
  withRequestForOffer: false
}

export type CreateOfferRequest = CreateOfferWithRequestForOfferRequest | CreateOfferWithoutRequestForOfferRequest
