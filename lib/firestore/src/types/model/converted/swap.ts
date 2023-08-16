import { Activity } from './activity'
import { OfferItemDetails } from './offer-item-details'
import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface Swap {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  expiresAt: Dayjs
  offerId: string
  receiverDiscordAvatar: string | undefined
  receiverDiscordId: string
  receiverDiscordUsername: string
  receiverItemsDetails: OfferItemDetails[]
  senderDiscordAvatar: string | undefined
  senderDiscordId: string
  senderDiscordUsername: string
  senderItemsDetails: OfferItemDetails[]
  state: SwapState
}
