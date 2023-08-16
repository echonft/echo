import { Activity } from './activity'
import { OfferItemDetails } from './offer-item-details'
import { OfferState } from './offer-state'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  discordGuildId: string
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  receiverId: string
  receiverDiscordAvatar: string | undefined
  receiverDiscordId: string
  receiverDiscordUsername: string
  receiverItemsIds: string[]
  receiverItemsDetails: OfferItemDetails[]
  senderId: string
  senderDiscordAvatar: string | undefined
  senderDiscordId: string
  senderDiscordUsername: string
  senderItemIds: string[]
  senderItemsDetails: OfferItemDetails[]
  state: OfferState
  threadId: string | undefined
}
