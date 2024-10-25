export interface CollectionDiscordGuildDocument {
  collectionId: string
  guild: {
    channelId: string
    id: string
  }
}
