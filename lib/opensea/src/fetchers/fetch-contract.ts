import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { contractResponseSchema } from '@echo/opensea/validators/contract-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'

export async function fetchContract(args: WithLoggerType<GetContractRequest>): Promise<ContractResponse> {
  const { fetch, contract } = args
  const url = `${getBaseUrl(contract.chain)}/chain/${contract.chain}/contract/${contract.address}`
  const logger = args.logger?.child({ url, fetcher: fetchContract.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ contract }, 'error fetching contract')
    return Promise.reject(Error(`error fetching contract`))
  }
  return parseResponse(contractResponseSchema)(response)
}
