import type { WithId } from '@echo/model/types/with-id'

export interface OfferThreadDiscordGuild {
  discordId: string
  channelId: string
  threadId: string
}

export interface OfferThread extends WithId {
  offerId: string
  guild: OfferThreadDiscordGuild
  postedAt: number
  state: 'ACTIVE' | 'ARCHIVED'
}
