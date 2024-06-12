import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { applySpec, prop } from 'ramda'

export function mapContractResponseToCollectionRequest(
  response: ContractResponse
): Omit<GetCollectionRequest, 'fetch'> {
  return applySpec<GetCollectionRequest>({ slug: prop('collection'), chain: prop('chain') })(response)
}
