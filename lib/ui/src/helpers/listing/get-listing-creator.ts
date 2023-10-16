import type { Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import { head, path, pipe, prop } from 'ramda'

export function getListingCreator(listing: Listing) {
  return pipe(prop('items'), head, path(['nft', 'owner']))(listing) as User
}
