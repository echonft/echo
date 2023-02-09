import { document } from './document'
import { FirebaseDocumentName, FirestoreDiscordCollection, mapCollection } from '@echo/firebase'
import { DiscordGuild } from '@echo/model'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function collection(id: string): Promise<DiscordGuild> {
  return document<FirestoreDiscordCollection, DiscordGuild>(id, FirebaseDocument.COLLECTIONS, mapCollection)
}
