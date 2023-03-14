import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreNestedDocumentConverter<T extends DocumentData, V extends FirestoreData> = (
  document: T
) => Promise<V>
