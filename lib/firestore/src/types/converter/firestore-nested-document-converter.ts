import { FirestoreDocumentData } from '../model/data/abstract/firestore-document-data'
import { DocumentData } from 'firebase/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreNestedDocumentConverter<T extends DocumentData, V extends FirestoreDocumentData> = (
  document: T
) => Promise<V>
