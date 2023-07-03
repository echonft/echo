import { QueryRequest } from '../api-requests/query-request'

export interface CreateNftCollectionRequest extends QueryRequest {
  address: string
  chainId: string
}
