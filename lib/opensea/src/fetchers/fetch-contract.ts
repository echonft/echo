import type { Contract } from '@echo/model/types/contract'
import { FetchError } from '@echo/opensea/constants/errors/fetch-error'
import { error } from '@echo/opensea/helpers/logger'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { contractResponseSchema } from '@echo/opensea/validators/contract-response-schema'
import { parseResponse } from '@echo/utils/validators/parse-response'

export async function fetchContract(contract: Contract): Promise<ContractResponse> {
  const url = openseaApiPathProvider.contract.fetch.getUrl(contract)
  const response = await throttleFetch(url)
  if (!response.ok) {
    error({ contract: contract, url }, FetchError.Contract)
    return Promise.reject(Error(FetchError.Contract))
  }
  return parseResponse(contractResponseSchema)(response)
}
