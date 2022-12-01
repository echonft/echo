import { firestore } from '../services'
import { FirebaseDocument } from '@echo/firebase'

export function documentSnapshot(id: string, collection: FirebaseDocument) {
  return firestore().collection(collection).doc(id).get()
}
