import { documentSnapshot } from './document-snapshot'
import { FirebaseDocumentName } from '@echo/firebase'
import { DiscordGuild } from '@echo/model'

export function collectionSnapshot(id: string) {
  return documentSnapshot<DiscordGuild>(id, FirebaseDocument.COLLECTIONS)
}
