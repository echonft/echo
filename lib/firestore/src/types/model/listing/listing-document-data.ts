import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft-index'

export interface ListingDocumentData extends Omit<Listing, 'readOnly'> {
  itemIndexes: NftIndex[]
  itemCollections: Lowercase<string>[]
}
