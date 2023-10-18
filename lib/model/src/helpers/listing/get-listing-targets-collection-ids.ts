import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getListingTargetsCollectionIds(listing: Partial<Listing> & Record<'targets', ListingTarget[]>) {
  return pipe(prop('targets'), map(path(['collection', 'id'])), uniq)(listing) as string[]
}
