import { NftAttributeDocumentData } from './nft-attribute-document-data'
import { NftCollectionDocumentData } from './nft-collection-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NftTokenType } from '@echo/firestore-types'

export interface NftDocumentData {
  id: string
  attributes: NftAttributeDocumentData[]
  balance: number
  blurUrl?: string
  collection: NftCollectionDocumentData
  name: string
  openSeaUrl?: string
  owner: UserDetailsDocumentData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
}
