export interface NftCollectionDiscordGuildData {
  channelId: string
  discordId: string
}

export interface FirestoreNftCollectionDiscordGuild {
  id: string
  collectionId: string
  guild: NftCollectionDiscordGuildData
}
