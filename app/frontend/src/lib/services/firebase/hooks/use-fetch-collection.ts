import { FirebaseCollection, FirebaseDocument, mapCollection } from '@echo/firebase'
import { Collection } from '@echo/model'
import { useDocument } from '@lib/services/firebase/hooks/use-document'

export function useFetchCollection(collectionId: string | undefined) {
  return useDocument<FirebaseCollection, Collection>(FirebaseDocument.COLLECTIONS, collectionId, {
    mapper: mapCollection
  })
}
