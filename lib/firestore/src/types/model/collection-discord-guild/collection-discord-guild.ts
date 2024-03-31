import type { WithId } from '@echo/model/types/with-id'

export interface CollectionDiscordGuildData {
  channelId: string
  discordId: string
}

export interface CollectionDiscordGuild extends WithId {
  collectionId: string
  guild: CollectionDiscordGuildData
}
