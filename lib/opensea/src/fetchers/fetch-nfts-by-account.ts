import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { FetchNftsByAccountRequest } from '@echo/opensea/types/request/fetch-nfts-by-account-request'
import type { FetchNftsResponse } from '@echo/opensea/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/opensea/validators/fetch-nfts-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByAccount(args: WithLoggerType<FetchNftsByAccountRequest>): Promise<FetchNftsResponse> {
  const { wallet, fetch } = args
  const url = openseaApiPathProvider.nfts.fetchByAccount.getUrl(wallet, pick(['next', 'limit'], args))
  const logger = args.logger?.child({ url, fetcher: fetchNftsByAccount.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ wallet, url, response: pick(['status'], response) }, 'error fetching NFTs by account')
    return Promise.reject(Error('error fetching NFTs by account'))
  }
  return parseResponse(fetchNftsResponseSchema)(response)
}
