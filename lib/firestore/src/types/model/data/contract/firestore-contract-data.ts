import { FirestoreContract } from '../../collections/contract/firestore-contract'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'

export interface FirestoreContractData extends FirestoreContract, FirestoreRootCollectionDocumentData {}
