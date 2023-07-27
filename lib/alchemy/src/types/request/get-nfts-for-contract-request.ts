import { FetcherData } from '@echo/utils'

export interface GetNftsForContractRequest extends FetcherData {
  contractAddress: string
  limit: string
  withMetadata: string
}
