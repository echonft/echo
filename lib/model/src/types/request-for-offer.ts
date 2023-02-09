import { Contract } from './contract'
import { DiscordGuild } from './discord-guild'
import { Offer } from './offer'
import { OfferItem } from './offer-item'
import { RequestForOfferActivity } from './request-for-offer-activity'
import { RequestForOfferState } from './request-for-offer-state'
import { Swap } from './swap'
import { User } from './user'
import { Dayjs } from 'dayjs'

export interface RequestForOffer {
  id: string
  status: RequestForOfferState
  sender: User
  items: OfferItem[]
  collection: DiscordGuild
  target: Contract[]
  activities: RequestForOfferActivity[]
  offers?: Offer[]
  swaps?: Swap[]
  expiresAt: Dayjs
  postedAt: Dayjs | undefined
  createdAt: Dayjs
}
