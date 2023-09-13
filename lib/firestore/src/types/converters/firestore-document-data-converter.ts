import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'

export interface FirestoreDocumentDataConverter<T, U> {
  toFirestore: (modelObject: FirestoreModel<U>) => T
  fromFirestore: (documentData: Partial<T>) => U
}
