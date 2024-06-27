import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

export async function fetchContract(args: WithLoggerType<GetContractRequest>): Promise<ContractResponse> {
  const { fetch, contract, logger } = args
  const url = `${getBaseUrl(contract.chain)}/chain/${contract.chain}/contract/${contract.address}`
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ fn: 'fetchContract', contract, url }, 'error fetching collection')
    return Promise.reject(Error(`error fetching contract ${JSON.stringify(contract)}`))
  }
  return parseFetchResponse<ContractResponse>(response)
}
