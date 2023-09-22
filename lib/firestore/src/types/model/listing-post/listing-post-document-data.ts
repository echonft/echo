export interface ListingDiscordGuildData {
  channelId: string
  discordId: string
}

export interface ListingPostDocumentData {
  id: string
  listingId: string
  guild: ListingDiscordGuildData
  postedAt: number
}
