import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import { getNftsByAccountResponseSchema } from '@echo/opensea/validators/get-nfts-by-account-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { applySpec, concat, defaultTo, pick, pipe, prop } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<GetNftsByAccountRequest>
): Promise<GetNftsByAccountResponse> {
  const { wallet, fetch } = args
  const query = applySpec<Pick<GetNftsByAccountRequest, 'next'> & Record<'limit', number>>({
    next: prop('next'),
    limit: pipe(prop('limit'), defaultTo(200))
  })(args)
  const url = concat(
    `${getBaseUrl(wallet.chain)}/chain/${wallet.chain}/account/${wallet.address}/nfts`,
    stringify(query, { addQueryPrefix: true, skipNulls: true })
  )
  const logger = args.logger?.child({ url, fetcher: fetchNftsByAccount.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ wallet, url, response: pick(['status'], response) }, 'error fetching NFTs')
    return Promise.reject(Error(`error fetching NFTs for wallet ${JSON.stringify(wallet)}`))
  }
  return parseResponse(getNftsByAccountResponseSchema)(response)
}
