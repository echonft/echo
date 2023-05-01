import { OfferItemResponse } from './offer-item-response'
import { OfferResponse } from './offer-response'
import { SwapResponse } from './swap-response'
import { Contract, DiscordGuild, RequestForOfferActivity, RequestForOfferState, User } from '@echo/model'

// TODO Should this become a simple listing response?
export interface CreateRequestForOfferResponse {
  id: string
  state: RequestForOfferState
  sender: User
  items: OfferItemResponse[]
  discordGuild: DiscordGuild
  target: Contract[]
  activities: RequestForOfferActivity[]
  offers?: OfferResponse[]
  swaps?: SwapResponse[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
