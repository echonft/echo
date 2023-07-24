import { FetcherData } from '@echo/utils'

export interface GetContractMetadataRequest extends FetcherData {
  contractAddress: string
}
