import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild-document-data'

export function addCollectionDiscordGuild(data: CollectionDiscordGuildDocumentData): Promise<string> {
  return setReference({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    data
  })
}
