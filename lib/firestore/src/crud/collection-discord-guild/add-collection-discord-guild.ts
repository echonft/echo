import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addCollectionDiscordGuild(
  collectionGuild: CollectionDiscordGuildDocumentData
): Promise<NewDocument<CollectionDiscordGuildDocumentData>> {
  const { collectionId, guild } = collectionGuild
  const discordGuilds = await getCollectionDiscordGuildsByCollection(collectionId)
  if (
    pipe(
      map<CollectionDiscordGuildDocumentData, CollectionDiscordGuildDocumentData['guild']>(prop('guild')),
      includes(guild)
    )(discordGuilds)
  ) {
    return Promise.reject(
      Error(
        `trying to add discord guild with discordId ${guild.id} and channelId ${guild.channelId} for collection with id ${collectionId} while it already exists`
      )
    )
  }
  const collection = await getCollectionById(collectionId)
  if (isNil(collection)) {
    return Promise.reject(
      Error(
        `trying to add discord guild with discordId ${guild.id} and channelId ${guild.channelId} for collection with id ${collectionId} but this collection does not exist`
      )
    )
  }
  const id = await setReference<CollectionDiscordGuildDocumentData, CollectionDiscordGuildDocumentData>({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    data: collectionGuild
  })
  return { id, data: collectionGuild }
}
