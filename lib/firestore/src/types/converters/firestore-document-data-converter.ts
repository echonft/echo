import { FirestoreModel } from '../abstract/firestore-model'

export interface FirestoreDocumentDataConverter<T, U> {
  toFirestore: (modelObject: FirestoreModel<U>) => T
  fromFirestore: (documentData: T) => U
}
