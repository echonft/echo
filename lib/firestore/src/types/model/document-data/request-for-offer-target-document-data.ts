import { NftCollectionDocumentData } from './nft-collection-document-data'
import { DocumentReference } from 'firebase-admin/lib/firestore'

export interface RequestForOfferTargetDocumentData {
  collection: DocumentReference<NftCollectionDocumentData>
  collectionBannerUrl?: string
  collectionProfilePictureUrl?: string
  count: number
}
