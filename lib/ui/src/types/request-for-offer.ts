import { Contract } from './contract'
import { DiscordGuild } from './discord-guild'
import { Nft } from './nft'
import { Offer } from './offer'
import { RequestForOfferActivity } from './request-for-offer-activity'
import { RequestForOfferState } from './request-for-offer-state'
import { Swap } from './swap'
import { User } from './user'
import dayjs from 'dayjs'

// TODO Target should be a collection
export interface RequestForOffer {
  id: string
  state: RequestForOfferState
  sender: User
  items: Nft[]
  discordGuild: DiscordGuild
  target: Contract[]
  activities: RequestForOfferActivity[]
  offers?: Offer[]
  swaps?: Swap[]
  expiresAt: dayjs.Dayjs
  postedAt: dayjs.Dayjs | undefined
  createdAt: dayjs.Dayjs
}
