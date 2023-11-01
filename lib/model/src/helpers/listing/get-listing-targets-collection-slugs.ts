import { getListingTargetsCollections } from '@echo/model/helpers/listing/get-listing-targets-collections'
import { type Listing } from '@echo/model/types/listing'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingTargetsCollectionSlugs(listing: Listing) {
  return pipe(getListingTargetsCollections, map(prop('slug')), uniq)(listing)
}
