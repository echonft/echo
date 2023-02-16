import { FirestoreData } from '../model/data/abstract/firestore-data'
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreConverter<T extends DocumentData, V extends FirestoreData> = (
  snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
) => Promise<V>
