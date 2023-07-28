import { FetcherData } from '@echo/utils'

export interface CreateNftCollectionRequest extends FetcherData {
  address: string
  chainId: string
}
