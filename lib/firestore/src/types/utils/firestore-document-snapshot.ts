import { DocumentData } from 'firebase/firestore'

export interface FirestoreDocumentSnapshot<T extends DocumentData> {
  id: string
  data: T
}
