import { Activity } from './activity'
import { OfferItemDetails } from './offer-item-details'
import { RequestForOfferState } from './request-for-offer-state'
import { RequestForOfferTarget } from './request-for-offer-target'
import { Dayjs } from 'dayjs'

export interface RequestForOffer {
  id: string
  activities: Activity[]
  createdAt: Dayjs
  creatorId: string
  creatorDiscordAvatar: string | undefined
  creatorDiscordId: string
  creatorDiscordUsername: string
  discordGuildId: string
  expiresAt: Dayjs
  itemsIds: string[]
  itemsDetails: OfferItemDetails[]
  offersIds: string[] | undefined
  postedAt: Dayjs | undefined
  state: RequestForOfferState
  swapsIds: string[] | undefined
  target: RequestForOfferTarget[]
}
