import { document } from './document'
import { FirebaseCollection, FirebaseDocument, mapCollection } from '@echo/firebase'
import { Collection } from '@echo/model'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function collection(id: string): Promise<Collection> {
  return document<FirebaseCollection, Collection>(id, FirebaseDocument.COLLECTIONS, mapCollection)
}
