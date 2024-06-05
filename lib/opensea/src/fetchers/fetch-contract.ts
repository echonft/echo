import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'

export async function fetchContract(args: GetContractRequest): Promise<ContractResponse> {
  const { fetch, address, chain } = args
  const url = `${getBaseUrl(isTestnetChain(chain))}/chain/${chain}/contract/${address}`
  const response = await throttleFetch({ fetch, url })
  if (!response.ok) {
    throw Error(`error fetching contract ${address} on chain ${chain}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return parseFetchResponse<ContractResponse>(response)
}
