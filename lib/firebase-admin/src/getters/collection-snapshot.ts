import { documentSnapshot } from './document-snapshot'
import { FirebaseDocument } from '@echo/firebase'
import { Collection } from '@echo/model'

export function collectionSnapshot(id: string) {
  return documentSnapshot<Collection>(id, FirebaseDocument.COLLECTIONS)
}
