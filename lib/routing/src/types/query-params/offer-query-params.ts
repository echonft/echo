import type { CollectionIndex } from '@echo/model/types/collection/collection'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'

export interface OfferQueryParams extends QueryParams {
  items: NftIndex[] | NftIndex
  target?: CollectionIndex
}
