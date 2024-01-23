import type { Listing } from '@echo/model/types/listing'

export interface ListingDocumentData extends Omit<Listing, 'readOnly'> {
  itemsNftIds: string[]
  itemsNftCollectionIds: string[]
  targetsIds: string[]
}
