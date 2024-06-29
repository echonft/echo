import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'

export interface ListingDocumentData extends Omit<Listing, 'readOnly'> {
  itemIndexes: NftIndex[]
  itemCollections: Slug[]
}
