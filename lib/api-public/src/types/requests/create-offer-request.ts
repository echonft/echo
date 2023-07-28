export interface CreateOfferWithRequestForOfferRequest {
  receiverItems: string[]
  senderItems: string[]
  requestForOfferId: string
  withRequestForOffer: true
}

export interface CreateOfferWithoutRequestForOfferRequest {
  receiverItems: string[]
  senderItems: string[]
  receiverId: string
  discordGuildId: string
  withRequestForOffer: false
}

export type CreateOfferRequest = CreateOfferWithRequestForOfferRequest | CreateOfferWithoutRequestForOfferRequest
