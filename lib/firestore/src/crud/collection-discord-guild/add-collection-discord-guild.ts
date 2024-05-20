import { findCollection } from '@echo/firestore/crud/collection/find-collection'
import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import {
  type CollectionDiscordGuild,
  type CollectionDiscordGuildData
} from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addCollectionDiscordGuild(
  collectionSlug: string,
  guildDiscordId: string,
  guildChannelId: string
): Promise<CollectionDiscordGuild> {
  const guild: CollectionDiscordGuildData = {
    channelId: guildChannelId,
    discordId: guildDiscordId
  }
  const discordGuilds = await getCollectionDiscordGuildsByCollection(collectionSlug)
  if (pipe(map<CollectionDiscordGuild, CollectionDiscordGuildData>(prop('guild')), includes(guild))(discordGuilds)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionSlug} while it already exists`
    )
  }
  const collection = await findCollection(collectionSlug)
  if (isNil(collection)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection ${collectionSlug} but this collection does not exist`
    )
  }
  const data = { collectionSlug, guild }
  await setReference<CollectionDiscordGuild>({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    data
  })
  return data
}
