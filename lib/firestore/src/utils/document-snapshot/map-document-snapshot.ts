import { FirestoreDocumentSnapshot } from '../../types'
import firebase from 'firebase/compat'
import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export const mapDocumentSnapshot = <T extends DocumentData>(
  snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
): FirestoreDocumentSnapshot<T> => ({
  id: snapshot.id,
  data: snapshot.data() as T,
})
