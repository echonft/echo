import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { PartialCollection } from '@echo/model/types/collection'
import type { PartialNft } from '@echo/model/types/nft'

export interface ListingQueryParams extends QueryParams {
  items?: PartialNft[]
  target?: PartialCollection
}
