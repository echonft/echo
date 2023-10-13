import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
import { getNftCollectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/get-nft-collection-discord-guilds-collection'
import type {
  CollectionDiscordGuild,
  CollectionDiscordGuildData
} from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addNftCollectionDiscordGuild(
  collectionId: string,
  guildDiscordId: string,
  guildChannelId: string
): Promise<CollectionDiscordGuild> {
  const guild: CollectionDiscordGuildData = {
    channelId: guildChannelId,
    discordId: guildDiscordId
  }
  const discordGuilds = await getNftCollectionDiscordGuildsByNftCollectionId(collectionId)
  if (pipe(map<CollectionDiscordGuild, CollectionDiscordGuildData>(prop('guild')), includes(guild))(discordGuilds)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} while it already exists`
    )
  }
  const nftCollection = await findNftCollectionById(collectionId)
  if (isNil(nftCollection)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const reference = getNftCollectionDiscordGuildsCollection().doc()
  const id = reference.id
  const newNftCollectionDiscordGuild: CollectionDiscordGuild = { id, collectionId, guild }
  await reference.set(newNftCollectionDiscordGuild)
  return newNftCollectionDiscordGuild
}
