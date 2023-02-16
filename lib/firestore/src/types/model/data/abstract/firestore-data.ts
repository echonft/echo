/**
 * Firestore data model represents the objects containing data of any ref they could have
 */
export interface FirestoreData {
  id: string
  [field: string]: unknown
}
