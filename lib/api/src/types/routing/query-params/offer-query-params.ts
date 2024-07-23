import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { PartialCollection } from '@echo/model/types/collection'
import type { PartialNft } from '@echo/model/types/nft'

export interface OfferQueryParams extends QueryParams {
  items: PartialNft[] | PartialNft
  target?: PartialCollection
}
