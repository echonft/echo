import { PartialWithFieldValue, WithFieldValue } from 'firebase-admin/lib/firestore'

export interface FirestoreDocumentDataConverter<T, U> {
  toFirestore: (modelObject: PartialWithFieldValue<U> | WithFieldValue<U>) => T
  fromFirestore: (documentData: T) => U
}
