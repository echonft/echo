import { FetchError } from '@echo/opensea/constants/errors/fetch-error'
import { error } from '@echo/opensea/helpers/logger'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { FetchNftsByContractRequest } from '@echo/opensea/types/request/fetch-nfts-by-contract-request'
import type { FetchNftsResponse } from '@echo/opensea/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/opensea/validators/fetch-nfts-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByContract({
  contract,
  next,
  limit
}: FetchNftsByContractRequest): Promise<FetchNftsResponse> {
  const url = openseaApiPathProvider.nfts.fetchByContract.getUrl(contract, { next, limit })
  const response = await throttleFetch(url)
  if (!response.ok) {
    error({ contract, url, response: pick(['status'], response) }, FetchError.Nfts)
    return Promise.reject(Error(FetchError.Nfts))
  }
  return parseResponse(fetchNftsResponseSchema)(response)
}
