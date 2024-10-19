import type { Expiration } from '@echo/model/constants/expiration'
import type { NftItem } from '@echo/model/types/item/nft-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { NonEmptyArray } from 'ramda'

export interface CreateListingRequestBuilderArgs {
  items: NonEmptyArray<NftItem>
  target: Listing['target']
  expiration: Expiration
}
