import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { isTestnetChain } from '@echo/utils/helpers/is-testnet-chain'
import { applySpec, pipe, prop } from 'ramda'

export function mapContractResponseToCollectionRequest(
  response: ContractResponse
): Omit<GetCollectionRequest, 'fetch'> {
  return applySpec<GetCollectionRequest>({ slug: prop('collection'), testnet: pipe(prop('chain'), isTestnetChain) })(
    response
  )
}
