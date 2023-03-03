/**
 * Model representing raw data of Firestore document, that is DocumentReference and nested documents
 * mapped to their pointing data
 */
export interface FirestoreDocumentData {
  [field: string]: unknown
}
