import type { Listing } from '@echo/ui/types/model/listing'
import { UserDetails } from '@echo/ui/types/model/user-details'
import { head, path, pipe, prop } from 'ramda'

export function getListingCreator(listing: Listing) {
  return pipe(prop('items'), head, path(['nft', 'owner']))(listing) as UserDetails
}
