import type { Expiration } from '@echo/model/constants/expiration'
import type { Listing } from '@echo/model/types/listing'
import type { NftItem } from '@echo/model/types/nft-item'
import type { NonEmptyArray } from 'ramda'

export interface CreateListingRequestBuilderArgs {
  readonly items: NonEmptyArray<NftItem>
  readonly target: Listing['target']
  readonly expiration: Expiration
}
