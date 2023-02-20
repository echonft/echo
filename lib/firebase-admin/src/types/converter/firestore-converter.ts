import { FirestoreData } from '@echo/firestore'
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreConverter<T extends DocumentData, V extends FirestoreData> = (
  snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
) => Promise<V>
