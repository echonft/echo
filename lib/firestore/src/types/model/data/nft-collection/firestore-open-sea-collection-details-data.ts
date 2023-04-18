import { FirestoreOpenSeaCollectionDetails } from '../../collections/nft-collection/firestore-open-sea-collection-details'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreOpenSeaCollectionDetailsData
  extends FirestoreOpenSeaCollectionDetails,
    FirestoreDocumentData {}
