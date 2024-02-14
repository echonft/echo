export interface OfferThreadDiscordGuild {
  discordId: string
  channelId: string
  threadId: string
}

export interface OfferThread {
  id: string
  offerId: string
  guild: OfferThreadDiscordGuild
  postedAt: number
  state: 'ACTIVE' | 'ARCHIVED'
}
