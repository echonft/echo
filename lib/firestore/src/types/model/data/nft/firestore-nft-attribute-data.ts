import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreNftAttributeData extends FirestoreDocumentData {
  trait: string
  value: string
}
