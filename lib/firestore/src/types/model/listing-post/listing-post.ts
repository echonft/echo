export interface ListingPostDiscordGuild {
  channelId: string
  id: string
}

export interface ListingPost {
  listingId: string
  guild: ListingPostDiscordGuild
  postedAt: number
}
