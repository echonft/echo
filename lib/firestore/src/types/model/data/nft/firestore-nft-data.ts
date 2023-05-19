import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreNftCollectionData } from '../nft-collection/firestore-nft-collection-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreNftAttributeData } from './firestore-nft-attribute-data'

export interface FirestoreNftData extends FirestoreRootCollectionDocumentData {
  attributes: FirestoreNftAttributeData[]
  balance: number
  collection: FirestoreNftCollectionData
  description?: string
  name?: string
  owner: FirestoreUserData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: string
}
