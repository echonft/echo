import { FirestoreOpenSeaCollectionDetails } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreOpenSeaCollectionDetailsData
  extends FirestoreOpenSeaCollectionDetails,
    FirestoreDocumentData {}
