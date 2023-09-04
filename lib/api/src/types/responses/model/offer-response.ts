import { OfferItemResponse } from './offer-item-response'
import { UserResponse } from './user-response'
import { OfferDiscordGuild, OfferState } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export interface OfferResponse {
  id: string
  discordGuild: OfferDiscordGuild | undefined
  expired: boolean
  expiresAt: number
  listingsIds: string[]
  receiver: UserResponse
  receiverItems: NonEmptyArray<OfferItemResponse>
  sender: UserResponse
  senderItems: NonEmptyArray<OfferItemResponse>
  state: OfferState
  swapTransactionId: string | undefined
}
