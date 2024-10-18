import type { Chain } from '@echo/utils/constants/chain'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface FetchCollectionRequest extends WithFetch {
  slug: string
  chain: Chain
}
