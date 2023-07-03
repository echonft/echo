import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'

export interface FirestoreContractData extends FirestoreRootCollectionDocumentData {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: string
}
