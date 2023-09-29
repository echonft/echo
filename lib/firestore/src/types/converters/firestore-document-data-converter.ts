import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'

export interface FirestoreDocumentDataConverter<T, U> {
  toFirestore: (modelObject: PartialWithFieldValue<U> | Partial<U>) => T
  fromFirestore: (documentData: T) => U
}
