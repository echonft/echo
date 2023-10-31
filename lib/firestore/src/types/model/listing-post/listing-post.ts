export interface ListingPostDiscordGuild {
  channelId: string
  discordId: string
}

export interface ListingPost {
  id: string
  listingId: string
  guild: ListingPostDiscordGuild
  postedAt: number
}
