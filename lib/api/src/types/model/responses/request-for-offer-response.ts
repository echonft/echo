import { OfferResponse } from './offer-response'
import { SwapResponse } from './swap-response'
import { FirestoreActivityData } from '@echo/firestore'
import { Contract, DiscordGuild, Nft, RequestForOfferState, User } from '@echo/model'

export interface RequestForOfferResponse {
  id: string
  state: RequestForOfferState
  sender: User
  items: Nft[]
  discordGuild: DiscordGuild
  target: Contract[]
  activities: FirestoreActivityData[]
  offers?: OfferResponse[]
  swaps?: SwapResponse[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
