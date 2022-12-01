import { document } from './document'
import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument, mapCollection } from '@echo/firebase'
import { Collection } from '@echo/model'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function getCollection(id: string): Promise<Collection> {
  return document(id, FirebaseDocument.COLLECTIONS, mapCollection)
}

export function collectionSnapshot(id: string) {
  return documentSnapshot(id, FirebaseDocument.COLLECTIONS)
}
