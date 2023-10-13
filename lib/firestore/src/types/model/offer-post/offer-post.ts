import type { OfferDiscordGuildData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import type { Dayjs } from 'dayjs'

export interface OfferPost {
  id: string
  offerId: string
  guild: OfferDiscordGuildData
  postedAt: Dayjs
}
