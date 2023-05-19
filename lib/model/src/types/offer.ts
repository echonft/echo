import { DiscordGuild } from './discord-guild'
import { Nft } from './nft'
import { OfferActivity } from './offer-activity'
import { OfferState } from './offer-state'
import { User } from './user'
import dayjs from 'dayjs'

export interface Offer {
  id: string
  state: OfferState
  discordGuild: DiscordGuild
  threadId: string | undefined
  sender: User
  senderItems: Nft[]
  receiver: User
  receiverItems: Nft[]
  activities?: OfferActivity[]
  expiresAt: dayjs.Dayjs
  postedAt: dayjs.Dayjs | undefined
  createdAt: dayjs.Dayjs
}
