import { getCollectionDiscordGuildsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-discord-guilds-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export async function deleteCollectionDiscordGuild(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getCollectionDiscordGuildsCollectionReference(),
    id
  })
}
