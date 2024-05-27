import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'

export interface GetCollectionRequest extends WithFetchRequest {
  slug: string
  testnet: boolean
}
