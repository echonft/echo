import { mapCollection } from '@echo/firebase/mappers/collection'
import { FirebaseCollection } from '@echo/firebase/model/collection'
import { FirebaseDocumentPath } from '@echo/firebase/paths/document-path'
import { Collection } from '@echo/model/collection'
import { useDocument } from '@lib/hooks/use-document'

export function useFetchCollection(collectionId: string | undefined) {
  return useDocument<FirebaseCollection, Collection>(FirebaseDocumentPath.COLLECTIONS, collectionId, {
    mapper: mapCollection
  })
}
