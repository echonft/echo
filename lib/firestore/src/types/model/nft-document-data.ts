import { NftAttributeDocumentData } from './nft-attribute-document-data'
import { NftCollectionDocumentData } from './nft-collection-document-data'
import { NftTokenType } from './nft-token-type'
import { UserDetailsDocumentData } from './user-details-document-data'

export interface NftDocumentData {
  attributes: NftAttributeDocumentData[]
  balance: number | undefined
  blurUrl: string | undefined
  collection: NftCollectionDocumentData
  name: string
  openSeaUrl: string | undefined
  owner: UserDetailsDocumentData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
}
