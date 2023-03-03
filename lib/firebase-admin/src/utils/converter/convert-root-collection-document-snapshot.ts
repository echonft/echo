import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreRootCollectionDocumentData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'

export function convertRootCollectionDocumentSnapshot<
  T extends DocumentData,
  V extends FirestoreRootCollectionDocumentData
>(snapshot: FirestoreSnapshot<T>): V {
  if (!snapshot.exists) {
    throw Error(`Document does not exist`)
  }
  return {
    refPath: snapshot.ref.path,
    id: snapshot.id,
    ...snapshot.data()
  } as V
}
