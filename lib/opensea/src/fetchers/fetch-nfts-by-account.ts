import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import { getNftsByAccountResponseSchema } from '@echo/opensea/validators/get-nfts-by-account-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<GetNftsByAccountRequest>
): Promise<GetNftsByAccountResponse> {
  const { wallet, fetch } = args
  const url = openseaApiPathProvider.nfts.fetch.getUrl(wallet, pick(['next', 'limit'], args))
  const logger = args.logger?.child({ url, fetcher: fetchNftsByAccount.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ wallet, url, response: pick(['status'], response) }, 'error fetching NFTs')
    return Promise.reject(Error('error fetching NFTs for wallet'))
  }
  return parseResponse(getNftsByAccountResponseSchema)(response)
}
