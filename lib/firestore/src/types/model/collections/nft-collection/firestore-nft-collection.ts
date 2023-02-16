import { FirestoreContract } from '../contract/firestore-contract'
import { FirestoreOpenSeaCollectionData } from './nested-documents/firestore-open-sea-collection-data'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreNftCollection extends DocumentData {
  contract: DocumentReference<FirestoreContract>
  totalSupply?: number
  openSea: FirestoreOpenSeaCollectionData
}
