import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import type {
  CollectionDiscordGuild,
  CollectionDiscordGuildData
} from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addCollectionDiscordGuild(
  collectionId: string,
  guildDiscordId: string,
  guildChannelId: string
): Promise<CollectionDiscordGuild> {
  const guild: CollectionDiscordGuildData = {
    channelId: guildChannelId,
    discordId: guildDiscordId
  }
  const discordGuilds = await getCollectionDiscordGuildsByCollectionId(collectionId)
  if (pipe(map<CollectionDiscordGuild, CollectionDiscordGuildData>(prop('guild')), includes(guild))(discordGuilds)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} while it already exists`
    )
  }
  const collection = await findCollectionById(collectionId)
  if (isNil(collection)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const reference = getCollectionDiscordGuildsCollectionReference().doc()
  const id = reference.id
  const newCollectionDiscordGuild: CollectionDiscordGuild = { id, collectionId, guild }
  await reference.set(newCollectionDiscordGuild)
  return newCollectionDiscordGuild
}
