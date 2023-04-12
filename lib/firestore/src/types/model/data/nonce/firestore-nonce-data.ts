import { FirestoreNonce } from '../../collections'
import { FirestoreRootCollectionDocumentData } from '../abstract'

export interface FirestoreNonceData extends FirestoreNonce, FirestoreRootCollectionDocumentData {
  nonce: string
}
