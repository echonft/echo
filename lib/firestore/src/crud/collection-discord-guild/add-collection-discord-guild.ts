import { CollectionGuildError } from '@echo/firestore/constants/errors/collection-guild-error'
import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { CollectionDiscordGuildDocument } from '@echo/firestore/types/model/collection-discord-guild-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addCollectionDiscordGuild(
  collectionGuild: CollectionDiscordGuildDocument
): Promise<NewDocument<CollectionDiscordGuildDocument>> {
  const { collectionId, guild } = collectionGuild
  const collection = await getCollectionById(collectionId)
  if (isNil(collection)) {
    return Promise.reject(Error(CollectionError.NotFound))
  }

  const discordGuilds = await getCollectionDiscordGuildsByCollection(collectionId)
  if (
    pipe(
      map<CollectionDiscordGuildDocument, CollectionDiscordGuildDocument['guild']>(prop('guild')),
      includes(guild)
    )(discordGuilds)
  ) {
    return Promise.reject(Error(CollectionGuildError.Exists))
  }

  const id = await setReference({
    collectionReference: collectionDiscordGuildsCollection(),
    data: collectionGuild
  })
  return { id, data: collectionGuild }
}
