import { OfferDiscordGuild } from './offer-discord-guild'
import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { UserDetails } from './user-details'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  createdAt: Dayjs
  discordGuild: OfferDiscordGuild | undefined
  expired: boolean
  expiresAt: Dayjs
  listingsIds: string[]
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem>
  state: OfferState
  swapTransactionId: string | undefined
}
