export interface OfferThreadDiscordGuild {
  channelId: string
  id: string
  threadId: string
}

export interface OfferThread {
  offerId: string
  guild: OfferThreadDiscordGuild
  postedAt: number
  state: 'ACTIVE' | 'ARCHIVED'
}
