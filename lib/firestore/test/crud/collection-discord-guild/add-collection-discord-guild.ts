import { collectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { CollectionDiscordGuildDocument } from '@echo/firestore/types/model/collection-discord-guild-document'

export function addCollectionDiscordGuild(data: CollectionDiscordGuildDocument): Promise<string> {
  return setReference({
    collectionReference: collectionDiscordGuildsCollection(),
    data
  })
}
