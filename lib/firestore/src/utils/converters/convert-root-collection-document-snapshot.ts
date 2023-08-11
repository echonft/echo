import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreRootCollectionDocumentData } from '../../types/model/data/abstract/firestore-root-collection-document-data'
import { DocumentData } from 'firebase/firestore'

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
