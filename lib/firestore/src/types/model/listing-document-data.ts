import type { Erc1155ItemDocumentData } from '@echo/firestore/types/model/erc1155-item-document-data'
import type { Erc721ItemDocumentData } from '@echo/firestore/types/model/erc721-token-document-data'
import type { Listing } from '@echo/model/types/listing/listing'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Slug } from '@echo/model/types/slug'
import type { NonEmptyArray } from 'ramda'

export interface ListingDocumentData extends Omit<Listing, 'items' | 'readOnly'> {
  items: NonEmptyArray<Erc721ItemDocumentData | Erc1155ItemDocumentData>
  itemIndexes: NftIndex[]
  itemCollections: Slug[]
}
