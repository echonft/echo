import { collectionDiscordGuildsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteNonce(id: string): Promise<string> {
  return deleteReference({
    collectionReference: collectionDiscordGuildsCollection(),
    id
  })
}
