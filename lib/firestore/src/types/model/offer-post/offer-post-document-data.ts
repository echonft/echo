export interface OfferDiscordGuildData {
  discordId: string
  threadId: string
}

export interface OfferPostDocumentData {
  id: string
  offerId: string
  guild: OfferDiscordGuildData
  postedAt: number
}
