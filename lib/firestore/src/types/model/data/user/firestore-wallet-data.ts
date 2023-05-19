import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreWalletData extends FirestoreDocumentData {
  chainId: number
  address: string
}
