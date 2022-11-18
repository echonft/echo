import { mapCollection } from '@echo/firebase/mappers/collection'
import { FirebaseCollection } from '@echo/firebase/models/collection'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { Collection } from '@echo/model/collection'
import { useDocument } from '@lib/services/firebase/hooks/use-document'

export function useFetchCollection(collectionId: string | undefined) {
  return useDocument<FirebaseCollection, Collection>(FirebaseDocument.COLLECTIONS, collectionId, {
    mapper: mapCollection
  })
}
