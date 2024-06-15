import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetCollectionRequest extends WithFetch {
  slug: string
  chain: ChainName
}
