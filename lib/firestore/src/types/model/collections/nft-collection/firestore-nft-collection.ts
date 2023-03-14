import { FirestoreContract } from '../contract/firestore-contract'
import { FirestoreOpenSeaCollectionDetails } from './firestore-open-sea-collection-details'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreNftCollection extends DocumentData {
  contract: DocumentReference<FirestoreContract>
  totalSupply?: number
  openSea: FirestoreOpenSeaCollectionDetails
}
