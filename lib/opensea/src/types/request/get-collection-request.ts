import type { WithFetch } from '@echo/utils/types/with-fetch'

export interface GetCollectionRequest extends WithFetch {
  slug: string
  testnet: boolean
}
