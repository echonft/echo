import { document } from './document'
import { FirebaseDocument, mapCollection } from '@echo/firebase'
import { Collection } from '@echo/model'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function collection(id: string): Promise<Collection> {
  return document(id, FirebaseDocument.COLLECTIONS, mapCollection)
}
