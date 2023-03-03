import { FirestoreDocumentData } from './firestore-document-data'

/**
 * Firestore data for root collection documents only.
 * These have an additional id and reference path
 */
export interface FirestoreRootCollectionDocumentData extends FirestoreDocumentData {
  id: string
  refPath: string
}
