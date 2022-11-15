import { mapCollection } from '@echo/firebase/mappers/collection'
import { FirebaseCollection } from '@echo/firebase/model/collection'
import { FirebaseDocumentPath } from '@echo/firebase/paths/document-path'
import { useDocument } from '@echo/frontend/lib/hooks/use-document'
import { Collection } from '@echo/model/src/collection'

export function useFetchCollection(collectionId: string | undefined) {
  return useDocument<FirebaseCollection, Collection>(FirebaseDocumentPath.COLLECTIONS, collectionId, {
    mapper: mapCollection
  })
}
