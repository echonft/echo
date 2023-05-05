import { OfferItemResponse } from './offer-item-response'
import { OfferResponse } from './offer-response'
import { SwapResponse } from './swap-response'
import { FirestoreActivityData } from '@echo/firestore'
import { Contract, DiscordGuild, RequestForOfferState, User } from '@echo/model'

// TODO Should this become a simple listing response?
export interface CreateRequestForOfferResponse {
  id: string
  state: RequestForOfferState
  sender: User
  items: OfferItemResponse[]
  discordGuild: DiscordGuild
  target: Contract[]
  activities: FirestoreActivityData[]
  offers?: OfferResponse[]
  swaps?: SwapResponse[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
