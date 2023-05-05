import { OfferItemResponse } from './offer-item-response'
import { FirestoreActivityData } from '@echo/firestore'
import { DiscordGuild, OfferState, User } from '@echo/model'

export interface OfferResponse {
  id: string
  state: OfferState
  discordGuild: DiscordGuild
  threadId: string | undefined
  sender: User
  senderItems: OfferItemResponse[]
  receiver: User
  receiverItems: OfferItemResponse[]
  activities?: FirestoreActivityData[]
  expiresAt: number
  postedAt: number | undefined
  createdAt: number
}
