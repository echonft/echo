import { FirebaseDocumentName, FirestoreDiscordCollection, mapCollection } from '@echo/firebase'
import { DiscordGuild } from '@echo/model'
import { useDocument } from '@lib/services/firebase/hooks/use-document'

export function useFetchCollection(collectionId: string | undefined) {
  return useDocument<FirestoreDiscordCollection, DiscordGuild>(FirebaseDocument.COLLECTIONS, collectionId, {
    mapper: mapCollection
  })
}
