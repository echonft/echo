export interface ListingPost {
  id: string
  listingId: string
  guild: {
    channelId: string
    discordId: string
  }
  postedAt: number
}
