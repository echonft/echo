import { document } from './document'
import { FirestoreDiscordCollection, FirestorePath, mapDiscordCollection } from '@echo/firebase'
import { DiscordGuild } from '@echo/model'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function collection(id: string): Promise<DiscordGuild> {
  return document<FirestoreDiscordCollection, DiscordGuild>(id, FirebaseDocument.COLLECTIONS, mapDiscordCollection)
}
