import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { FetchNftsByContractRequest } from '@echo/opensea/types/request/fetch-nfts-by-contract-request'
import type { FetchNftsResponse } from '@echo/opensea/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/opensea/validators/fetch-nfts-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByContract(
  args: WithLoggerType<FetchNftsByContractRequest>
): Promise<FetchNftsResponse> {
  const { contract, fetch } = args
  const url = openseaApiPathProvider.nfts.fetchByContract.getUrl(contract, pick(['next', 'limit'], args))
  const logger = args.logger?.child({ url, fetcher: fetchNftsByContract.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ contract, url, response: pick(['status'], response) }, 'error fetching NFTs by contract')
    return Promise.reject(Error('error fetching NFTs by contract'))
  }
  return parseResponse(fetchNftsResponseSchema)(response)
}
