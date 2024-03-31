import type { WithId } from '@echo/model/types/with-id'

export interface ListingPostDiscordGuild {
  channelId: string
  discordId: string
}

export interface ListingPost extends WithId {
  listingId: string
  guild: ListingPostDiscordGuild
  postedAt: number
}
