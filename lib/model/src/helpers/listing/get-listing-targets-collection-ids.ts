import { getListingTargetsCollections } from '@echo/model/helpers/listing/get-listing-targets-collections'
import { type Listing } from '@echo/model/types/listing'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingTargetsCollectionIds(listing: Listing) {
  return pipe(getListingTargetsCollections, map(prop('id')), uniq)(listing)
}
