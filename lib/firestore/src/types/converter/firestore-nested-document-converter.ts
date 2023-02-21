import { FirestoreData } from '../model/data/abstract/firestore-data'
import { DocumentData } from 'firebase/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreNestedDocumentConverter<T extends DocumentData, V extends FirestoreData> = (
  document: T
) => Promise<V>
