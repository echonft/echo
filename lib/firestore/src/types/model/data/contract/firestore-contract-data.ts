import { FirestoreContract } from '../../collections'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'

export interface FirestoreContractData extends FirestoreContract, FirestoreRootCollectionDocumentData {}
