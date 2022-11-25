import { getDocument, getDocumentSnapshot } from '../utils/document'
import { mapCollection } from '@echo/firebase/mappers/collection'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { Collection } from '@echo/model/collection'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function getCollection(id: string): Promise<Collection> {
  return getDocument(id, FirebaseDocument.COLLECTIONS, mapCollection)
}

export function getCollectionSnapshot(id: string) {
  return getDocumentSnapshot(id, FirebaseDocument.COLLECTIONS)
}
