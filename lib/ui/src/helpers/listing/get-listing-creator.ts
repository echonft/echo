import type { Listing } from '@echo/ui/types/model/listing'
import type { User } from '@echo/ui/types/model/user'
import { head, path, pipe, prop } from 'ramda'

export function getListingCreator(listing: Listing) {
  return pipe(prop('items'), head, path(['nft', 'owner']))(listing) as User
}
