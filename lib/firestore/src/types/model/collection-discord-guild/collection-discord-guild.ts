export interface CollectionDiscordGuildData {
  channelId: string
  discordId: string
}

export interface CollectionDiscordGuild {
  id: string
  collectionId: string
  guild: CollectionDiscordGuildData
}
