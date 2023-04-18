import { FirestoreNonce } from '../../collections/nonce/firestore-nonce'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'

export interface FirestoreNonceData extends FirestoreNonce, FirestoreRootCollectionDocumentData {
  nonce: string
}
