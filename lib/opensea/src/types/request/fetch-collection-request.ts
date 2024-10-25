import type { Chain } from '@echo/model/constants/chain'
import type { Slug } from '@echo/model/types/slug'

export interface FetchCollectionRequest {
  slug: Slug
  chain: Chain
}
