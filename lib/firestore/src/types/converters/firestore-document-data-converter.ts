import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'

export interface FirestoreDocumentDataConverter<T, U> {
  toFirestore: (modelObject: PartialWithFieldValue<U> | Partial<U>) => PartialWithFieldValue<T> | Partial<T>
  fromFirestore: (documentData: T) => U
}
