import { NftAttributeDocumentData } from './nft-attribute-document-data'
import { NftCollectionDocumentData } from './nft-collection-document-data'
import { NftTokenType } from './nft-token-type'
import { UserDetailsDocumentData } from './user-details-document-data'

export interface NftDocumentData {
  id: string
  attributes: NftAttributeDocumentData[]
  balance?: number
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
