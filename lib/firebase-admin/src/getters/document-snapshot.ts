import { firestore } from '../services'
import { FirebaseDocument } from '@echo/firebase'
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore'

export function documentSnapshot<T extends DocumentData>(id: string, collection: FirebaseDocument) {
  return firestore().collection(collection).doc(id).get() as Promise<DocumentSnapshot<T>>
}
