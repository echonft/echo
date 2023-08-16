import { NftAttributeDocumentData } from './nft-attribute-document-data'
import { NftCollectionDocumentData } from './nft-collection-document-data'
import { UserDocumentData } from './user-document-data'
import { WalletDocumentData } from './wallet-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface NftDocumentData extends DocumentData {
  attributes?: NftAttributeDocumentData[]
  balance?: number
  blurUrl?: string
  collection: DocumentReference<NftCollectionDocumentData>
  collectionName: string
  name: string
  openSeaUrl?: string
  owner: DocumentReference<UserDocumentData>
  ownerWallet: WalletDocumentData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: string
}
