import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'

export interface FirestoreNonceData extends FirestoreRootCollectionDocumentData {
  nonce: string
}
