import { FirestoreNftCollection } from '../../collections/nft-collection/firestore-nft-collection'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreOpenSeaCollectionDetailsData } from './firestore-open-sea-collection-details-data'

export interface FirestoreNftCollectionData
  extends Omit<FirestoreNftCollection, 'contract'>,
    FirestoreRootCollectionDocumentData {
  contract: FirestoreContractData
  totalSupply?: number
  openSea: FirestoreOpenSeaCollectionDetailsData
}
