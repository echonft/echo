import type { Collection } from '@echo/model/types/collection'
import { type Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { map, pipe, prop } from 'ramda'

export function getListingTargetsCollections(listing: Listing) {
  return pipe<[Listing], ListingTarget[], Collection[]>(prop('targets'), map(prop('collection')))(listing)
}
