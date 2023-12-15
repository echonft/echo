import type { Listing } from '@echo/model/types/listing'

export interface ListingDocumentData extends Omit<Listing, 'expired'> {
  itemsNftIds: string[]
  itemsNftCollectionIds: string[]
  targetsIds: string[]
}
