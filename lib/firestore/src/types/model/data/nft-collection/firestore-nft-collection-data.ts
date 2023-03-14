import { FirestoreNftCollection } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreOpenSeaCollectionDetailsData } from './firestore-open-sea-collection-details-data'

export interface FirestoreNftCollectionData extends Omit<FirestoreNftCollection, 'contract'>, FirestoreData {
  id: string
  contract: FirestoreContractData
  totalSupply?: number
  openSea: FirestoreOpenSeaCollectionDetailsData
}
