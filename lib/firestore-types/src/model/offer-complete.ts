import { Nft } from './nft'
import { OfferDiscordGuild } from './offer-discord-guild'
import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { UserDetails } from './user-details'
import { NonEmptyArray } from '@echo/utils'
import { Dayjs } from 'dayjs'

export interface OfferComplete {
  id: string
  createdAt: Dayjs
  discordGuild?: OfferDiscordGuild
  expired: boolean
  expiresAt: Dayjs
  listingsIds: string[]
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem & { nft: Nft }>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem & { nft: Nft }>
  state: OfferState
  swapTransactionId?: string
}
