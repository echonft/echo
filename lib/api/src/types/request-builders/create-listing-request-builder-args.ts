import type { Expiration } from '@echo/model/constants/expiration'
import type { Listing } from '@echo/model/types/listing/listing'

export interface CreateListingRequestBuilderArgs {
  items: Listing['items']
  target: Listing['target']
  expiration: Expiration
}
