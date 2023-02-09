import { DiscordGuild } from './discord-guild'
import { OfferActivity } from './offer-activity'
import { OfferItem } from './offer-item'
import { OfferState } from './offer-state'
import { User } from './user'
import { Dayjs } from 'dayjs'

export interface Offer {
  id: string
  state: OfferState
  discordGuild: DiscordGuild
  threadId: string | undefined
  sender: User
  senderItems: OfferItem[]
  receiver: User
  receiverItems: OfferItem[]
  activities: OfferActivity[]
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  createdAt: Dayjs
}
